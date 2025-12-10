import { NewsItem } from '../types';
import { db } from './db';

// Service Layer ที่เชื่อมต่อกับ "Database" ของเรา
export const newsService = {
  getAllNews: async (): Promise<NewsItem[]> => {
    // จำลอง Network Latency เล็กน้อยเพื่อให้ดูสมจริง
    await new Promise(resolve => setTimeout(resolve, 500));
    return db.news.getAll();
  },

  getNewsByCategory: async (category: string): Promise<NewsItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const allNews = await db.news.getAll();
    if (category === 'all') return allNews;
    return allNews.filter(item => item.category === category);
  }
};