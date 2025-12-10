import { NewsItem } from '../types';
import { NEWS_ITEMS } from '../constants';

// Keys for LocalStorage
const STORAGE_KEYS = {
  NEWS: 'terapia_news_data',
};

// Helper to initialize data if not present
const initData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(NEWS_ITEMS));
  }
};

export const db = {
  news: {
    getAll: async (): Promise<NewsItem[]> => {
      initData();
      const data = localStorage.getItem(STORAGE_KEYS.NEWS);
      return data ? JSON.parse(data) : [];
    },
    
    add: async (item: Omit<NewsItem, 'id'>): Promise<NewsItem> => {
      initData();
      const currentItems = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWS) || '[]');
      const newItem = { ...item, id: Date.now() }; // Generate pseudo-ID
      const updatedItems = [newItem, ...currentItems];
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updatedItems));
      return newItem;
    },

    update: async (id: number, updates: Partial<NewsItem>): Promise<void> => {
      initData();
      const currentItems: NewsItem[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWS) || '[]');
      const updatedItems = currentItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      );
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updatedItems));
    },

    delete: async (id: number): Promise<void> => {
      initData();
      const currentItems: NewsItem[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWS) || '[]');
      const updatedItems = currentItems.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(updatedItems));
    }
  }
};