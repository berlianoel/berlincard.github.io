import { motion } from 'framer-motion';

export default function SocialsSection() {
  const socials = [
    { 
      name: 'Discord', 
      username: 'berlinnad', 
      icon: 'fab fa-discord', 
      link: 'https://discord.com/users/berlinnad', 
      color: 'bg-[#5865F2]/20 text-[#5865F2]' 
    },
    { 
      name: 'Instagram', 
      username: '@berlinnad', 
      icon: 'fab fa-instagram', 
      link: 'https://instagram.com/berlinnad', 
      color: 'bg-[#E1306C]/20 text-[#E1306C]' 
    },
    { 
      name: 'Twitter', 
      username: '@berlinnad', 
      icon: 'fab fa-twitter', 
      link: 'https://twitter.com/berlinnad', 
      color: 'bg-[#1DA1F2]/20 text-[#1DA1F2]' 
    },
    { 
      name: 'TikTok', 
      username: '@berlinnad', 
      icon: 'fab fa-tiktok', 
      link: 'https://tiktok.com/@berlinnad', 
      color: 'bg-[#000000]/20 text-gray-200' 
    },
  ];

  return (
    <section 
      id="socials"
      className="section mb-16 glass rounded-lg p-6 md:p-8"
    >
      <h2 className="font-cinzel text-3xl text-primary mb-6 flex items-center">
        <i className="fas fa-share-nodes mr-3"></i> Social Media
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {socials.map((social, index) => (
          <motion.a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center p-4 rounded-lg ${social.color} hover:scale-105 transition-transform duration-300`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-12 h-12 flex items-center justify-center text-2xl">
              <i className={social.icon}></i>
            </div>
            <div className="ml-3">
              <h3 className="font-cinzel font-medium">{social.name}</h3>
              <p className="text-sm text-gray-300">{social.username}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}