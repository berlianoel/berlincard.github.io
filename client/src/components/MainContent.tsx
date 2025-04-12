import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import AboutSection from './AboutSection';
import InterestsSection from './InterestsSection';
import ByfDniSection from './ByfDniSection';
import SocialsSection from './SocialsSection';
import MusicSection from './MusicSection';
import ServicesSection from './ServicesSection';
import MessagesSection from './MessagesSection';
import Footer from './Footer';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

interface MainContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function MainContent({ activeSection, setActiveSection }: MainContentProps) {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const { user, logoutMutation } = useAuth();
  const [_, navigate] = useLocation();

  // If no active section is set, default to 'about'
  useEffect(() => {
    if (!activeSection) {
      setActiveSection('about');
    }
  }, [activeSection, setActiveSection]);

  // Handle scrolling to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen py-12 px-4 md:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="fixed inset-0 bg-cover bg-center z-[-1]" 
           style={{backgroundImage: "url('https://i.ibb.co/gFHGbmwB/Crimson-Portal.jpg')"}}></div>
      <div className="fixed inset-0 bg-gradient-to-b from-background/80 to-background/95 z-[-1]"></div>
      
      {/* HEADER */}
      <Header setActiveSection={setActiveSection} activeSection={activeSection} />
      
      {/* CONTENT SECTIONS */}
      <div className="max-w-4xl mx-auto mt-8">
        <AnimatePresence mode="wait">
          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AboutSection />
            </motion.div>
          )}
          
          {activeSection === 'interests' && (
            <motion.div
              key="interests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <InterestsSection />
            </motion.div>
          )}
          
          {activeSection === 'byf-dni' && (
            <motion.div
              key="byf-dni"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ByfDniSection />
            </motion.div>
          )}
          
          {activeSection === 'socials' && (
            <motion.div
              key="socials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SocialsSection />
            </motion.div>
          )}
          
          {activeSection === 'music' && (
            <motion.div
              key="music"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MusicSection />
            </motion.div>
          )}
          
          {activeSection === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ServicesSection />
            </motion.div>
          )}
          
          {activeSection === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MessagesSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* FOOTER */}
      <Footer 
        scrollToTop={scrollToTop} 
        showAdminModal={() => setShowAdminModal(true)} 
      />
    </motion.main>
  );
}
