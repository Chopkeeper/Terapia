import React from 'react';
import { Activity, Heart, UserPlus, Users, Home, Smile, BriefcaseMedical, UserCheck } from 'lucide-react';
import { NewsItem, TeamMember, BlogPost, Testimonial, ServiceFeature } from './types';

export const NEWS_ITEMS: NewsItem[] = [
  { id: 1, title: 'งบทดลองปีงบประมาณ 2568', date: '3 พ.ย. 2568', category: 'download' },
  { id: 2, title: 'ประกาศรายชื่อผู้ผ่านการคัดเลือก (ตำแหน่งนักกายภาพบำบัด)', date: '29 ต.ค. 2568', category: 'news' },
  { id: 3, title: 'ตารางเวรประจำเดือน ธันวาคม 2568', date: '25 ต.ค. 2568', category: 'news' },
  { id: 4, title: 'ประกวดราคาจ้างก่อสร้างอาคาร', date: '20 ต.ค. 2568', category: 'procure' },
];

export const FEATURES: ServiceFeature[] = [
  { icon: <Activity className="w-10 h-10 text-primary" />, title: "Licensed Therapist", description: "Professional certified therapists dedicated to your recovery." },
  { icon: <BriefcaseMedical className="w-10 h-10 text-primary" />, title: "Personalized Treatment", description: "Customized care plans tailored to your specific needs." },
  { icon: <UserPlus className="w-10 h-10 text-primary" />, title: "Therapy Goals", description: "Setting and achieving realistic recovery milestones together." },
  { icon: <Users className="w-10 h-10 text-primary" />, title: "Practitioners Network", description: "Connected with a wide network of medical professionals." },
  { icon: <Home className="w-10 h-10 text-primary" />, title: "Comfortable Center", description: "State-of-the-art facilities designed for your comfort." },
  { icon: <Heart className="w-10 h-10 text-primary" />, title: "Experienced Staff", description: "Years of hands-on experience in physical rehabilitation." },
  { icon: <Smile className="w-10 h-10 text-primary" />, title: "Positive Atmosphere", description: "A supportive environment to boost your mental well-being." },
  { icon: <UserCheck className="w-10 h-10 text-primary" />, title: "Expert Care", description: "Top-tier medical attention for complex physical issues." },
];

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: "Dr. Sarah Johnson", role: "Message Physio Therapist", image: "https://picsum.photos/400/500?random=10" },
  { id: 2, name: "Dr. William Anderson", role: "Rehabilitation Therapist", image: "https://picsum.photos/400/500?random=11" },
  { id: 3, name: "Dr. Emily Davis", role: "Doctor of Physical Therapy", image: "https://picsum.photos/400/500?random=12" },
  { id: 4, name: "Dr. Michael Wilson", role: "Senior Therapist", image: "https://picsum.photos/400/500?random=13" },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: "Remove Back Pain While Working", date: "01 Jan 2025", comments: 3, image: "https://picsum.photos/600/400?random=20", excerpt: "Learn ergonomic tips to keep your back healthy during long office hours." },
  { id: 2, title: "Benefits of Weekly Physiotherapy", date: "05 Jan 2025", comments: 5, image: "https://picsum.photos/600/400?random=21", excerpt: "Consistency is key. Discover how regular sessions accelerate recovery." },
  { id: 3, title: "Regular Exercise Slows Ageing", date: "10 Jan 2025", comments: 2, image: "https://picsum.photos/600/400?random=22", excerpt: "Scientific studies show that daily movement keeps your cells young." },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "John Abraham", location: "New York, USA", rating: 5, text: "The team at Terapia is incredible. They helped me recover from my sports injury faster than I expected.", image: "https://picsum.photos/100/100?random=30" },
  { id: 2, name: "Jane Doe", location: "London, UK", rating: 5, text: "Highly professional and caring staff. The facilities are top-notch and the atmosphere is very healing.", image: "https://picsum.photos/100/100?random=31" },
  { id: 3, name: "Robert Smith", location: "Sydney, AU", rating: 4, text: "Great experience overall. The personalized treatment plan really worked for my chronic back pain.", image: "https://picsum.photos/100/100?random=32" },
];