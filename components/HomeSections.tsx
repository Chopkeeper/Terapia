import React, { useState, useEffect } from 'react';
import { Play, Check, Facebook, Twitter, Instagram, Linkedin, Calendar, MessageCircle, X, Loader2, AlertCircle } from 'lucide-react';
import { FEATURES, TEAM_MEMBERS, BLOG_POSTS, TESTIMONIALS } from '../constants';
import { newsService } from '../services/api';
import { NewsItem } from '../types';

// ==========================================
// [USER CONFIG] แก้ไขรูปภาพสไลด์ด้านบนที่นี่
// ==========================================
const HERO_IMAGES = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  // เพิ่ม URL รูปภาพใหม่ต่อท้ายได้เลย เช่น:
  // "https://example.com/my-new-image.jpg"
];

// --- Hero Section ---
export const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] lg:h-[800px] overflow-hidden bg-gray-900">
      {HERO_IMAGES.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-50' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      ))}
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl animate-fade-in-up">
          <h5 className="text-lg md:text-xl font-bold uppercase tracking-[3px] mb-4 text-primary">Physiotherapy Center</h5>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">Best Solution For Painful Life</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Professional care for your physical health using modern techniques and compassionate service.
          </p>
          <a href="#appointment" className="inline-block bg-primary hover:bg-teal-700 text-white font-semibold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Book Appointment
          </a>
        </div>
      </div>
      
      {/* Slider Indicators (Optional: to show how many images there are) */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2 z-20">
        {HERO_IMAGES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-primary w-8' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- Announcements Section (Connected to Mock Backend) ---
export const Announcements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'procure' | 'download'>('all');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // เรียกใช้ Service เพื่อดึงข้อมูล (เหมือนยิง API จริง)
        const data = await newsService.getAllNews();
        setNewsItems(data);
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลข่าวสารได้ กรุณาลองใหม่อีกครั้ง');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNews = activeTab === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeTab);

  return (
    <div className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-primary font-bold uppercase tracking-wider border border-primary px-3 py-1 rounded-full text-sm inline-block mb-4">Latest Updates</span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Hospital Announcements</h2>
          <p className="text-gray-600">ข่าวประชาสัมพันธ์และประกาศล่าสุดจากทางโรงพยาบาล เพื่อให้ท่านไม่พลาดข้อมูลสำคัญ</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { id: 'all', label: 'ทั้งหมด' },
            { id: 'news', label: 'ประชาสัมพันธ์' },
            { id: 'procure', label: 'จัดซื้อ/จัดจ้าง' },
            { id: 'download', label: 'ดาวน์โหลดเอกสาร' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-full border transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-white border-primary text-gray-700 hover:bg-teal-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 min-h-[300px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-primary">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p>กำลังโหลดข้อมูล...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-red-500">
              <AlertCircle className="w-10 h-10 mb-4" />
              <p>{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-primary font-bold w-16">No.</th>
                    <th className="p-4 text-primary font-bold">หัวข้อข่าว</th>
                    <th className="p-4 text-primary font-bold w-32">วันที่</th>
                    <th className="p-4 text-primary font-bold text-center w-24">แชร์</th>
                    <th className="p-4 text-primary font-bold text-center w-32">ดาวน์โหลด</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredNews.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-semibold text-gray-600 pl-6">{index + 1}</td>
                      <td className="p-4 font-medium text-gray-800">{item.title}</td>
                      <td className="p-4 text-gray-500 text-sm whitespace-nowrap">{item.date}</td>
                      <td className="p-4 text-center">
                        <button className="w-8 h-8 rounded-full border border-primary text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-all mx-auto">
                          <Facebook className="w-4 h-4" />
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button className="px-4 py-1 bg-primary text-white text-sm rounded-full hover:bg-teal-700 transition-colors">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredNews.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">ไม่พบข้อมูลในหมวดหมู่นี้</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="text-center mt-8">
          <a href="#" className="inline-block bg-primary hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md">
            View All News
          </a>
        </div>
      </div>
    </div>
  );
};

// --- About Section ---
export const About: React.FC = () => {
  return (
    <div className="py-20 bg-gray-50" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-5/12 relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/600/800?random=5" alt="Clinic Interior" className="w-full h-auto object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border-8 border-white overflow-hidden shadow-xl hidden md:block">
               <img src="https://picsum.photos/400/400?random=6" alt="Happy Patient" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-10 -left-6 bg-primary text-white py-2 px-6 rounded-r-full shadow-lg font-bold">
              15+ Years Experience
            </div>
          </div>
          
          <div className="lg:w-7/12">
            <span className="text-primary font-bold uppercase tracking-wider mb-2 block">About Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">We are Ready to Help Improve Your Treatment.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              We provide comprehensive physical therapy services designed to get you back to your best self. Our expert team uses the latest techniques and technology to treat pain, improve mobility, and prevent future injuries.
            </p>
            <div className="space-y-4 mb-8">
              {[
                "Personalized touch in every session.",
                "Evidence-based treatment plans.",
                "Comfortable and modern facilities."
              ].map((text, i) => (
                <div key={i} className="flex items-center text-gray-700">
                  <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <a href="#" className="inline-block bg-primary hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md">
              Discover More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Features Section ---
export const Features: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold uppercase tracking-wider border border-primary px-3 py-1 rounded-full text-sm inline-block mb-4">Why Choose Us</span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Get Your Lifestyle Back</h2>
          <p className="text-gray-600">We offer a holistic approach to recovery, focusing on the root cause of your discomfort to provide lasting relief.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="mb-6 inline-block p-4 bg-white rounded-lg shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                 {/* Clone element to change color on hover if needed, or rely on CSS classes */}
                 <div className="group-hover:text-white transition-colors [&>svg]:text-current">
                    {feature.icon}
                 </div>
              </div>
              <h5 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h5>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Appointment Section ---
export const Appointment: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="py-20 bg-light relative" id="appointment">
      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl aspect-video">
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-primary z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/DWRcNpR6Kdc?autoplay=1" 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="mb-8">
              <span className="text-primary font-bold uppercase tracking-wider mb-2 block">Solutions To Your Pain</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">Best Quality Services With Minimal Pain Rate</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Experience expert care in a soothing environment. We combine advanced medical practices with a holistic approach to healing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
                  <h5 className="font-bold text-lg mb-2 flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" /> Body Relaxation
                  </h5>
                  <p className="text-gray-600 text-sm">Targeted therapies to reduce stress and muscle tension.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
                  <h5 className="font-bold text-lg mb-2 flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" /> Expert Diagnosis
                  </h5>
                  <p className="text-gray-600 text-sm">Precise identification of issues for effective treatment.</p>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                <img src="https://picsum.photos/800/400?random=15" alt="Video Thumbnail" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center animate-pulse">
                    <Play className="w-6 h-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-primary rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <p className="text-white/80 font-bold uppercase tracking-wider mb-2">Get In Touch</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8">Book An Appointment</h2>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white transition-all" />
                  <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone" className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white transition-all" />
                  <select className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/20 focus:border-white transition-all [&>option]:text-gray-900">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="date" className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/20 focus:border-white transition-all" />
                  <select className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/20 focus:border-white transition-all [&>option]:text-gray-900">
                    <option value="">Department</option>
                    <option value="physio">Physiotherapy</option>
                    <option value="rehab">Rehabilitation</option>
                    <option value="massage">Massage</option>
                  </select>
                </div>
                <textarea rows={4} placeholder="Describe your issue..." className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white transition-all"></textarea>
                
                <button type="button" className="w-full bg-white text-primary font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg mt-4">
                  SUBMIT REQUEST
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Team Section ---
export const Team: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold uppercase tracking-wider border border-primary px-3 py-1 rounded-full text-sm inline-block mb-4">Meet Our Team</span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Professional Therapists</h2>
          <p className="text-gray-600">Our team consists of highly qualified and experienced professionals dedicated to your recovery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-t-xl">
                <img src={member.image} alt={member.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  {[Facebook, Twitter, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 border border-t-0 border-gray-100 p-6 text-center rounded-b-xl shadow-sm group-hover:shadow-lg transition-shadow">
                <h5 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h5>
                <p className="text-primary text-sm font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Testimonial Section ---
export const TestimonialSection: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-20 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-bold uppercase tracking-wider border border-white/20 px-3 py-1 rounded-full text-sm inline-block mb-4">Testimonials</span>
          <h2 className="text-4xl font-serif font-bold mb-4">What Our Clients Say</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative h-80 md:h-64">
             {TESTIMONIALS.map((item, index) => (
               <div 
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out transform flex flex-col items-center justify-center text-center ${
                    index === active ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
               >
                 <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary mb-6 mx-auto">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                 </div>
                 <p className="text-xl md:text-2xl font-light italic mb-6 leading-relaxed">"{item.text}"</p>
                 <h5 className="text-xl font-bold text-primary">{item.name}</h5>
                 <p className="text-gray-400 text-sm">{item.location}</p>
                 <div className="flex mt-2 text-yellow-500 justify-center">
                   {[...Array(5)].map((_, i) => (
                     <svg key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-current' : 'text-gray-600 fill-current'}`} viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                   ))}
                 </div>
               </div>
             ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`w-3 h-3 rounded-full transition-all ${active === idx ? 'bg-primary w-8' : 'bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Blog Section ---
export const Blog: React.FC = () => {
  return (
    <div className="py-20 bg-white" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold uppercase tracking-wider border border-primary px-3 py-1 rounded-full text-sm inline-block mb-4">Our Blog</span>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Latest Health Tips</h2>
          <p className="text-gray-600">Stay informed with our latest articles on physical therapy, health, and wellness.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              <div className="relative h-60 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded uppercase">
                  Health
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-primary" /> {post.date}</span>
                  <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1 text-primary" /> {post.comments} Comments</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary transition-colors cursor-pointer line-clamp-2">{post.title}</h4>
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{post.excerpt}</p>
                <a href="#" className="inline-block text-primary font-semibold hover:tracking-wide transition-all uppercase text-sm mt-auto">
                  Read More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
