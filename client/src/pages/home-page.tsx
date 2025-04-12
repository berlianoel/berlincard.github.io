import { useState, useEffect } from 'react';
import Entrance from '@/components/Entrance';
import MainNavigation from '@/components/MainNavigation';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

export default function HomePage() {
  const [isEntered, setIsEntered] = useState(false);
  const [location] = useLocation();
  
  // Add Font Awesome script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
  // Apply styles to the body for the dark theme
  useEffect(() => {
    document.body.classList.add('bg-black');
    document.body.style.overflow = isEntered ? 'auto' : 'hidden';
    
    return () => {
      document.body.classList.remove('bg-black');
      document.body.style.overflow = '';
    };
  }, [isEntered]);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div 
        className="fixed inset-0 bg-cover bg-center z-[-1]" 
        style={{ backgroundImage: "url('https://wallpapersmug.com/download/3840x2160/5bbf06/dark-red-minimal-pattern.jpg')" }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-black/70 to-black/90 z-[-1]" />
      
      {!isEntered ? (
        <Entrance onEnter={() => setIsEntered(true)} />
      ) : (
        <MainNavigation />
      )}
    </div>
  );
}
