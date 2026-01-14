
export enum MessageType {
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  ALERT = 'ALERT',
  UPDATE = 'UPDATE',
}

export enum Department {
  ALL = 'All Departments',
  ENGINEERING = 'Engineering',
  HR = 'Human Resources',
  SALES = 'Sales',
  MARKETING = 'Marketing',
  EXECUTIVE = 'Executive',
  PRODUCT = 'Product',
  IT = 'IT Support'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email?: string;
  department?: Department | string;
  status?: 'Active' | 'Inactive';
  joinDate?: string;
}

export interface Post {
  id: string;
  type: MessageType;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  department: Department;
  likes: number;
  comments: number;
  tags?: string[];
}

export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  url: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TranslationResult {
  original: string;
  translated: string;
  detectedLanguage?: string;
}
