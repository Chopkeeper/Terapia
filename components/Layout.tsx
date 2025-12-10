import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Menu, X, ArrowRight, Asterisk } from 'lucide-react';

export const Topbar: React.FC = () => {
  return (
    <div className="hidden lg:block bg-gray-900 text-white py-2 px-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-6 text-sm">
          <a href="#" className="flex items-center hover:text-primary transition-colors">
            <MapPin className="w-4 h-4 text-primary mr-2" /> Find A Location
          </a>
          <a href="#" className="flex items-center hover:text-primary transition-colors">
            <Phone className="w-4 h-4 text-primary mr-2" /> +01234567890
          </a>
          <a href="#" className="flex items-center hover:text-primary transition-colors">
            <Mail className="w-4 h-4 text-primary mr-2" /> Example@gmail.com
          </a>
        </div>
        <div className="flex space-x-2">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
            <a key={idx} href="#" className="w-8 h-8 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-primary hover:text-white transition-all">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-white w-full z-50 transition-all duration-300 ${isSticky ? 'fixed top-0 shadow-lg py-2' : 'relative py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center text-primary">
          <Asterisk className="w-8 h-8 mr-2 animate-spin-slow" />
          <h1 className="text-3xl font-bold font-serif text-gray-800">Terapia</h1>
        </a>

        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-6 font-medium text-gray-600">
            <a href="#" className="text-primary">Home</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#blog" className="hover:text-primary transition-colors">Blog</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg">
            Book Appointment
          </button>
        </div>

        <button className="lg:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t z-50">
          <div className="flex flex-col p-4 space-y-4 font-medium text-gray-600">
            <a href="#" className="text-primary">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
            <button className="bg-primary text-white px-6 py-2 rounded-full w-full">
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-serif font-bold mb-4 flex items-center">
              <Asterisk className="w-6 h-6 mr-2 text-primary" /> Terapia
            </h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus dolorem impedit eos autem dolores laudantium quia, qui similique.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 flex items-center justify-center border border-gray-700 rounded-full hover:bg-primary hover:border-primary transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              {['About Us', 'Contact Us', 'Privacy Policy', 'Terms & Conditions', 'Our Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="flex items-center hover:text-primary transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-gray-400">
              {['Physiotherapy', 'Diagnostics', 'Manual Therapy', 'Massage Therapy', 'Rehabilitation'].map((link) => (
                <li key={link}>
                  <a href="#" className="flex items-center hover:text-primary transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-1" />
                <span>123 Street, New York, USA</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <span>info@example.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <span>+012 345 67890</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; <span className="text-primary">Terapia</span>. All Rights Reserved.</p>
          <p>Designed by React Engineer</p>
        </div>
      </div>
    </div>
  );
};