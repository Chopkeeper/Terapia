import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Topbar, Navbar, Footer } from './components/Layout';
import { 
  Hero, 
  Announcements, 
  About, 
  Features, 
  Appointment, 
  Team, 
  TestimonialSection, 
  Blog 
} from './components/HomeSections';
import { AdminLayout, DashboardHome } from './components/admin/AdminLayout';
import { NewsManager } from './components/admin/NewsManager';

// --- Public Layout Component ---
const PublicLayout = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle anchor links when route changes
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-gray-700 bg-white">
      <Topbar />
      <Navbar />
      <main>
        <Hero />
        <Announcements />
        <About />
        <Features />
        <Appointment />
        <Team />
        <TestimonialSection />
        <Blog />
      </main>
      <Footer />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 bg-primary text-white rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300 transform ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="news" element={<NewsManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;