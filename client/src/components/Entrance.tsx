import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EntranceProps {
  onEnter: () => void;
}

export default function Entrance({ onEnter }: EntranceProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{ x: number, y: number, size: number, speed: number }>>([]);
  
  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
    }));
    setParticles(newParticles);
    
    // Prevent scrolling on entrance page
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-background"
      style={{
        backgroundImage: `url('https://i.ibb.co/gFHGbmwB/Crimson-Portal.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80 z-0"></div>
      
      {/* Particles */}
      <div className="fixed inset-0 z-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/50 rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.speed * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="text-center z-10 relative px-4">
        <motion.h1 
          className="font-cinzel text-4xl md:text-6xl mb-8 text-primary"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Berlinnad's Realm
        </motion.h1>
        
        <motion.div 
          className="w-64 h-36 mx-auto mb-10 cursor-pointer rounded-xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div 
            className="relative w-full h-full glass border-2 border-primary/70 rounded-xl overflow-hidden shadow-lg shadow-primary/50"
            onClick={onEnter}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: isHovered 
                ? "0 0 20px 5px rgba(128, 0, 32, 0.7)" 
                : "0 0 10px 2px rgba(128, 0, 32, 0.5)" 
            }}
          >
            {/* Animated border */}
            <motion.div 
              className="absolute inset-0 rounded-xl border-2 border-primary/20"
              animate={{ 
                boxShadow: ["inset 0 0 10px rgba(128, 0, 32, 0.3)", "inset 0 0 20px rgba(128, 0, 32, 0.6)", "inset 0 0 10px rgba(128, 0, 32, 0.3)"],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Inner content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="font-cinzel text-3xl text-white tracking-wider drop-shadow-lg">ENTER</span>
              </motion.div>
              <motion.div 
                className="w-16 h-0.5 bg-primary/60 mt-2"
                animate={{ width: [60, 80, 60] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Click to enter the royal domain
        </motion.p>
      </div>
    </motion.div>
  );
}
