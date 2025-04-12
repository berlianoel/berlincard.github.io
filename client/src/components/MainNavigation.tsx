import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionModal from './SectionModal';
import AdminModal from './AdminModal';

export default function MainNavigation() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  
  const navButtons = [
    { id: 'about', icon: 'fas fa-user-crown', label: 'About Me', color: 'bg-red-900/80 hover:bg-red-800' },
    { id: 'interests', icon: 'fas fa-sparkles', label: 'Interests', color: 'bg-red-900/60 hover:bg-red-800' },
    { id: 'byf-dni', icon: 'fas fa-scroll', label: 'BYF / DNI', color: 'bg-red-900/60 hover:bg-red-800' },
    { id: 'socials', icon: 'fas fa-share-nodes', label: 'Socials', color: 'bg-red-900/60 hover:bg-red-800' },
    { id: 'music', icon: 'fas fa-music', label: 'Music', color: 'bg-red-900/60 hover:bg-red-800' },
    { id: 'services', icon: 'fas fa-crown', label: 'Services', color: 'bg-red-900/60 hover:bg-red-800' },
    { id: 'messages', icon: 'fas fa-message', label: 'Secret Messages', color: 'bg-red-900/60 hover:bg-red-800' },
  ];
  
  const getSectionContent = (id: string) => {
    switch (id) {
      case 'about':
        return (
          <div className="p-4">
            <h3 className="font-cinzel text-xl text-red-600 mb-3">Basic Information</h3>
            <ul className="space-y-3 md:w-2/3 mx-auto">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-id-card"></i>
                </span>
                <span>
                  <span className="text-gray-400">Pronouns:</span> They/Them
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-cake-candles"></i>
                </span>
                <span>
                  <span className="text-gray-400">Age:</span> 17+
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-brain"></i>
                </span>
                <span>
                  <span className="text-gray-400">MBTI:</span> INFJ-T
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-location-dot"></i>
                </span>
                <span>
                  <span className="text-gray-400">Location:</span> Yogyakarta, Indonesia
                </span>
              </li>
            </ul>
            
            <div className="my-6 glass rounded-lg p-4 border border-red-900/30 animate-fadeIn">
              <p className="text-gray-300 leading-relaxed text-center md:text-left">
                Selamat datang di kerajaan digital saya! Saya adalah Berlinnad, penguasa kegelapan modern yang menggabungkan
                estetika kerajaan kuno dengan teknologi. Di sini, kode dan kreativitas adalah senjata saya, dan kegelapan adalah tempat saya
                menemukan keindahan.
              </p>
            </div>
            
            <h3 className="font-cinzel text-xl text-red-600 mb-3">Random Facts About Me</h3>
            <ul className="space-y-3 md:w-2/3 mx-auto">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-crown"></i>
                </span>
                <span>I rule this dark kingdom with creativity and code</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-moon"></i>
                </span>
                <span>I find beauty in the shadows and elegance in the night</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-code"></i>
                </span>
                <span>Passionate about web development and creating digital experiences</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-headphones"></i>
                </span>
                <span>Music is the soundtrack to my dark kingdom</span>
              </li>
            </ul>
          </div>
        );
      case 'interests':
        return (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {['Anime', 'Gaming', 'Coding', 'Music'].map((interest, index) => (
                <div key={index} className="card glass p-5 rounded-lg text-center">
                  <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-3xl text-primary">
                    <i className={
                      index === 0 ? "fas fa-tv" : 
                      index === 1 ? "fas fa-gamepad" : 
                      index === 2 ? "fas fa-code" : 
                      "fas fa-music"
                    }></i>
                  </div>
                  <h3 className="font-cinzel text-lg text-gray-200">{interest}</h3>
                </div>
              ))}
            </div>
          </div>
        );
      case 'byf-dni':
        return (
          <div className="p-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-cinzel text-xl text-gray-200 mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                    <i className="fas fa-check text-primary"></i>
                  </span>
                  Before You Follow
                </h3>
                <ul className="space-y-3 pl-10">
                  {['Respect my boundaries and personal space', 
                    'Be kind and thoughtful in interactions',
                    'Understand I might take time to respond'].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-cinzel text-xl text-gray-200 mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center mr-2">
                    <i className="fas fa-xmark text-destructive"></i>
                  </span>
                  Do Not Interact
                </h3>
                <ul className="space-y-3 pl-10">
                  {['Toxic or disrespectful individuals', 
                    'Those who spread negativity',
                    'People under 17 years old'].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-destructive mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      case 'socials':
        return (
          <div className="p-4">
            <div className="grid gap-4 grid-cols-2">
              {[
                { name: 'Discord', username: 'berlinnad', icon: 'fab fa-discord', color: 'bg-[#5865F2]/20 text-[#5865F2]' },
                { name: 'Instagram', username: '@berlinnad', icon: 'fab fa-instagram', color: 'bg-[#E1306C]/20 text-[#E1306C]' },
                { name: 'Twitter', username: '@berlinnad', icon: 'fab fa-twitter', color: 'bg-[#1DA1F2]/20 text-[#1DA1F2]' },
                { name: 'TikTok', username: '@berlinnad', icon: 'fab fa-tiktok', color: 'bg-[#000000]/20 text-gray-200' },
              ].map((social, index) => (
                <div
                  key={index}
                  className={`flex items-center p-4 rounded-lg ${social.color}`}
                >
                  <div className="w-12 h-12 flex items-center justify-center text-2xl">
                    <i className={social.icon}></i>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-cinzel font-medium">{social.name}</h3>
                    <p className="text-sm text-gray-300">{social.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'music':
        return (
          <div className="p-4">
            <div className="rounded-lg overflow-hidden glass bg-black/50 p-2 border border-red-900/30">
              <iframe
                src="https://open.spotify.com/embed/playlist/17O7Wg5VzmpqTqdlhbhKpl?utm_source=generator&theme=0"
                width="100%" 
                height="500" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        );
      case 'services':
        return (
          <div className="p-4">
            <div className="grid md:grid-cols-2 gap-5 mb-6">
              {[
                { name: "Web Development", desc: "Website, aplikasi, atau platform online custom", icon: "fa-code" },
                { name: "Game Development", desc: "Game sederhana berbasis web atau mobile", icon: "fa-gamepad" },
                { name: "Tech Support", desc: "Perbaikan komputer, laptop, atau smartphone", icon: "fa-wrench" },
                { name: "Delivery", desc: "Pengiriman barang area Yogyakarta", icon: "fa-truck-fast" },
                { name: "Design", desc: "Logo, banner, dan konten visual lainnya", icon: "fa-palette" },
                { name: "Custom", desc: "Layanan khusus sesuai kebutuhan Anda", icon: "fa-crown" }
              ].map((service, index) => (
                <div 
                  key={index} 
                  className="glass border border-red-900/30 rounded-lg p-4 hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30"
                >
                  <div className="flex items-start mb-1">
                    <span className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center mr-3 text-red-500">
                      <i className={`fas ${service.icon} text-lg`}></i>
                    </span>
                    <div>
                      <h3 className="font-cinzel text-lg text-gray-200">{service.name}</h3>
                      <p className="text-sm text-gray-400">{service.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <form className="space-y-4 mt-8 max-w-md mx-auto glass rounded-lg p-5 border border-red-900/30">
              <h3 className="font-cinzel text-xl text-center text-red-600 mb-4">Request Service</h3>
              <div>
                <label className="font-cinzel text-gray-300 block mb-1">Your Name</label>
                <input 
                  type="text"
                  placeholder="Enter your name" 
                  className="w-full px-3 py-2 bg-background/50 border border-gray-700 focus:border-red-600 rounded-md" 
                />
              </div>
              
              <div>
                <label className="font-cinzel text-gray-300 block mb-1">WhatsApp / Email</label>
                <input 
                  type="text"
                  placeholder="Enter your contact information" 
                  className="w-full px-3 py-2 bg-background/50 border border-gray-700 focus:border-red-600 rounded-md" 
                />
              </div>
              
              <div>
                <label className="font-cinzel text-gray-300 block mb-1">Your Request</label>
                <textarea
                  placeholder="Describe what service you need in detail" 
                  className="w-full px-3 py-2 bg-background/50 border border-gray-700 focus:border-red-600 rounded-md"
                  rows={4}
                ></textarea>
              </div>
              
              <button 
                type="button" 
                className="w-full bg-red-900 hover:bg-red-800 text-white py-3 rounded-md font-cinzel"
              >
                Submit Request
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <button
                className="text-red-700/60 hover:text-red-600 text-xs flex items-center justify-center mx-auto"
                onClick={() => setShowAdminModal(true)}
              >
                <i className="fas fa-lock mr-1"></i> Admin Access
              </button>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="p-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-cinzel text-xl text-red-600 mb-4 flex items-center">
                  <i className="fas fa-message mr-2"></i>
                  Leave a Message
                </h3>
                
                <div className="glass border border-red-900/30 rounded-lg p-5 animate-fadeIn">
                  <form className="space-y-4">
                    <div>
                      <label className="font-cinzel text-gray-300 block mb-1">Your Name (or Anonymous)</label>
                      <input 
                        type="text"
                        placeholder="Enter your name or alias" 
                        className="w-full px-3 py-2 bg-background/50 border border-gray-700 focus:border-red-600 rounded-md" 
                      />
                    </div>
                    
                    <div>
                      <label className="font-cinzel text-gray-300 block mb-1">Your Message</label>
                      <textarea
                        placeholder="Type your message here..." 
                        className="w-full px-3 py-2 bg-background/50 border border-gray-700 focus:border-red-600 rounded-md"
                        rows={5}
                      ></textarea>
                    </div>
                    
                    <button 
                      type="button" 
                      className="w-full bg-red-900 hover:bg-red-800 text-white py-2 rounded-md font-cinzel"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              
              <div>
                <h3 className="font-cinzel text-xl text-red-600 mb-4 flex items-center">
                  <i className="fas fa-comments mr-2"></i>
                  Recent Messages
                </h3>
                
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  <div className="text-center py-8 text-gray-400 glass rounded-lg border border-red-900/20 p-6">
                    <i className="fas fa-message text-4xl mb-4 opacity-20"></i>
                    <p>No messages yet. Be the first to leave a message!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const getSectionTitle = (id: string) => {
    const section = navButtons.find(button => button.id === id);
    return section ? section.label : '';
  };
  
  const getSectionIcon = (id: string) => {
    const section = navButtons.find(button => button.id === id);
    return section ? section.icon : '';
  };
  
  const staggerDelay = 0.05;
  
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
      <div className="mb-8">
        <motion.div 
          className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-red-800 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://i.ibb.co/pvQ6d1y5/46391e8d-b233-4034-88db-892d2fa27bdc.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/128?text=Profile';
            }}
          />
        </motion.div>
        
        <motion.h1 
          className="font-cinzel text-4xl md:text-5xl text-red-700 mb-3 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Berlinnad
        </motion.h1>
        
        <motion.p 
          className="text-xl italic text-gray-300 max-w-md mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          "Where darkness meets royalty, I rule with code and creativity."
        </motion.p>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 gap-4 max-w-sm mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              staggerChildren: 0.07,
              delayChildren: 0.3
            }
          }
        }}
      >
        {navButtons.map((button, index) => (
          <motion.button
            key={button.id}
            className={`${button.color} px-4 py-3 rounded-md font-cinzel text-red-100 shadow-md border border-red-700/50 flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105`}
            onClick={() => setActiveSection(button.id)}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.5,
                  delay: index * staggerDelay
                }
              }
            }}
            style={{
              gridColumn: button.id === 'messages' ? '1 / span 2' : 'auto'
            }}
          >
            <i className={button.icon}></i> {button.label}
          </motion.button>
        ))}
      </motion.div>
      
      <AnimatePresence>
        {activeSection && (
          <SectionModal
            isOpen={!!activeSection}
            onClose={() => setActiveSection(null)}
            title={getSectionTitle(activeSection)}
            icon={getSectionIcon(activeSection)}
          >
            {getSectionContent(activeSection)}
          </SectionModal>
        )}
      </AnimatePresence>
      
      {showAdminModal && (
        <AdminModal onClose={() => setShowAdminModal(false)} />
      )}
    </div>
  );
}