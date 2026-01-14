import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, Globe } from 'lucide-react';
import { translateText } from '../services/geminiService';

const LANGUAGES = [
  { code: 'Spanish', name: 'Spanish' },
  { code: 'French', name: 'French' },
  { code: 'German', name: 'German' },
  { code: 'Chinese', name: 'Chinese (Simplified)' },
  { code: 'Japanese', name: 'Japanese' },
  { code: 'Portuguese', name: 'Portuguese' },
  { code: 'Hindi', name: 'Hindi' },
];

const LanguageSuite: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetLang, setTargetLang] = useState('Spanish');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    
    setIsTranslating(true);
    const result = await translateText(sourceText, targetLang);
    setTranslatedText(result);
    setIsTranslating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Globe className="text-blue-600" />
          Language Suite
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Break down communication barriers with instant, neural-powered translation.</p>
      </div>

      <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-start">
        {/* Source */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 h-96 flex flex-col transition-colors">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="font-semibold text-slate-700 dark:text-slate-300">English (Detected)</span>
          </div>
          <textarea
            className="flex-1 w-full resize-none border-none focus:ring-0 p-0 text-lg text-slate-700 dark:text-slate-200 placeholder:text-slate-300 bg-transparent"
            placeholder="Enter text to translate..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4 pt-12">
          <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
            <ArrowRightLeft className="text-slate-400" />
          </div>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
          <button
            onClick={handleTranslate}
            disabled={isTranslating || !sourceText}
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </button>
        </div>

        {/* Target */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl shadow-inner border border-slate-200 dark:border-slate-800 p-4 h-96 flex flex-col relative group transition-colors">
           <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-blue-700 dark:text-blue-400">{targetLang}</span>
             {translatedText && (
              <button 
                onClick={handleCopy}
                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Copy translation"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </button>
            )}
          </div>
          <div className="flex-1 text-lg text-slate-800 dark:text-slate-200 overflow-y-auto">
            {translatedText ? (
              <p>{translatedText}</p>
            ) : (
              <p className="text-slate-300 dark:text-slate-500 italic">Translation will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSuite;