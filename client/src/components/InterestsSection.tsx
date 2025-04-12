import { motion } from 'framer-motion';

export default function InterestsSection() {
  const interests = [
    { icon: 'fas fa-tv', label: 'Anime' },
    { icon: 'fas fa-gamepad', label: 'Gaming' },
    { icon: 'fas fa-code', label: 'Coding' },
    { icon: 'fas fa-heart', label: 'Dia' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section 
      id="interests"
      className="section mb-16 glass rounded-lg p-6 md:p-8"
    >
      <h2 className="font-cinzel text-3xl text-primary mb-6 flex items-center">
        <i className="fas fa-sparkles mr-3"></i> Interests
      </h2>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {interests.map((interest, index) => (
          <motion.div 
            key={index}
            className="card glass p-5 rounded-lg text-center transform transition-all duration-300 hover:scale-105"
            variants={itemVariants}
          >
            <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-3xl text-primary">
              <i className={interest.icon}></i>
            </div>
            <h3 className="font-cinzel text-lg text-gray-200">{interest.label}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}