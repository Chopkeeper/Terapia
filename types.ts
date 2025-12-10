import React from 'react';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  category: 'all' | 'news' | 'procure' | 'download';
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  comments: number;
  image: string;
  excerpt: string;
}

export interface ServiceFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}