import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle } from "../types";

// Initialize the API client
// Note: In a real environment, ensure process.env.API_KEY is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// System instruction for the Company Assistant to act as the "Bible"
const COMPANY_BIBLE_INSTRUCTION = `
You are Nexus, the AI Chat Companion for Acme Corp.
Your goal is to answer employee questions about company policies, SOPs, and structure.
Use the following context as the "Single Source of Truth":

1. HR Policy:
   - Remote Work: Employees can work remotely 2 days a week (Tue/Thu).
   - PTO: 20 days per year, accuring 1.66 days/month.
   - Expense: Meals covered up to $50/day during travel. Receipt required.

2. SOPs (Standard Operating Procedures):
   - Code Deploy: Must pass CI/CD and have 2 approvals before merging to main.
   - Client Onboarding: Use the Salesforce "New Client" wizard. TAT is 48 hours.

3. Hierarchy:
   - CEO: Jane Doe
   - CTO: Mark Smith
   - VP of Sales: Sarah Johnson

Keep answers concise, professional, and supportive. If you don't know, say "Please check with HR directly."
`;

/**
 * Chat with the AI Companion regarding company knowledge.
 */
export const chatWithCompanyCompanion = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: COMPANY_BIBLE_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I am currently having trouble accessing the company database. Please try again later.";
  }
};

/**
 * Translate text using Gemini.
 */
export const translateText = async (
  text: string,
  targetLang: string
): Promise<string> => {
  try {
    const prompt = `Translate the following text to ${targetLang}. Only return the translated text, no preamble. Text: "${text}"`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Translation failed.";
  } catch (error) {
    console.error("Translation Error:", error);
    return "Translation service unavailable.";
  }
};

/**
 * Fetch and curate industry news using Google Search Grounding.
 */
export const fetchIndustryNews = async (industryKeyword: string): Promise<NewsArticle[]> => {
  try {
    const prompt = `You are a real-time news aggregator. Find 5 distinct, recent, and high-quality news articles about "${industryKeyword}" from the last 48 hours.
    
    Use the googleSearch tool to find the actual articles.
    
    Return the result as a strictly valid JSON array.
    Each object must have:
    - title: The headline
    - summary: A very short summary (max 30 words)
    - source: The news outlet name
    - date: The publication date
    - url: The direct URL to the full story
    
    Do not output markdown code blocks. Do not include full article text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        maxOutputTokens: 2000, // Limit output to prevent massive hallucinations/loops
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              source: { type: Type.STRING },
              date: { type: Type.STRING },
              url: { type: Type.STRING },
            }
          }
        }
      }
    });

    // Clean up response text to ensure it's valid JSON
    let jsonString = response.text || "[]";
    
    // Remove markdown code blocks if present (common with JSON responses)
    if (jsonString.includes("```")) {
      jsonString = jsonString.replace(/```json\n?|```/g, "").trim();
    }

    // Parse the JSON content
    let articles = [];
    try {
        articles = JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse news JSON", e);
        console.log("Raw response:", jsonString.substring(0, 500) + "..."); // Log start of response for debugging
        return [];
    }

    // Extract grounding metadata to get real URLs if the model failed to populate them in JSON
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const chunkUrls = groundingChunks
      .map((c: any) => c.web?.uri)
      .filter((uri: string) => uri);

    // Merge and Validate
    return articles.map((article: any, index: number) => {
      let finalUrl = article.url;
      
      // If JSON url is missing or doesn't look like a URL, try to fallback to grounding chunks
      if (!finalUrl || !finalUrl.startsWith('http')) {
         finalUrl = chunkUrls[index] || '#';
      }

      return {
        ...article,
        url: finalUrl
      };
    });

  } catch (error) {
    console.error("News Aggregation Error:", error);
    return [
      {
        title: "News Feed Unavailable",
        summary: "Unable to fetch live news at this moment. Please check your connection or try again.",
        source: "System",
        url: "#",
        date: new Date().toISOString()
      }
    ];
  }
};