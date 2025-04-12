import { motion } from 'framer-motion';

interface HeaderProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

export default function Header({ setActiveSection, activeSection }: HeaderProps) {
  const navButtons = [
    { id: 'about', icon: 'fas fa-user-crown', label: 'About Me' },
    { id: 'interests', icon: 'fas fa-sparkles', label: 'Interests' },
    { id: 'byf-dni', icon: 'fas fa-scroll', label: 'BYF / DNI' },
    { id: 'socials', icon: 'fas fa-share-nodes', label: 'Socials' },
    { id: 'music', icon: 'fas fa-music', label: 'Music' },
    { id: 'services', icon: 'fas fa-crown', label: 'Services' },
    { id: 'messages', icon: 'fas fa-message', label: 'Secret Messages' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className="max-w-5xl mx-auto mb-16 text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full border-4 border-primary shadow-lg"
        variants={itemVariants}
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
        className="font-cinzel text-4xl md:text-5xl text-primary mb-3"
        variants={itemVariants}
      >
        Berlinnad
      </motion.h1>
      
      <motion.p 
        className="text-xl italic text-gray-300 max-w-md mx-auto"
        variants={itemVariants}
      >
        "Where royalty, I rule with creativity."
      </motion.p>
      
      <motion.div 
        className="w-full max-w-2xl mx-auto mt-8 flex flex-wrap justify-center gap-3"
        variants={containerVariants}
      >
        {navButtons.map((button) => (
          <motion.button
            key={button.id}
            className={`glass px-4 py-3 rounded-md font-cinzel transition-all duration-300 flex items-center gap-2 ${
              activeSection === button.id 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'text-primary hover:bg-primary/20'
            }`}
            onClick={() => setActiveSection(button.id)}
            variants={itemVariants}
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
          >
            <i className={button.icon}></i> {button.label}
          </motion.button>
        ))}
      </motion.div>
    </motion.header>
  );
}
