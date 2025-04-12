import { motion } from 'framer-motion';

export default function ByfDniSection() {
  const byfItems = [
    'Respect my boundaries and personal space',
    'Be kind and thoughtful in interactions',
    'Understand I might take time to respond',
  ];

  const dniItems = [
    'Toxic or disrespectful individuals',
    'Those who spread negativity',
    'People under 17 years old',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section 
      id="byf-dni"
      className="section mb-16 glass rounded-lg p-6 md:p-8"
    >
      <h2 className="font-cinzel text-3xl text-primary mb-6 flex items-center">
        <i className="fas fa-scroll mr-3"></i> BYF / DNI
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h3 className="font-cinzel text-xl text-gray-200 mb-3 flex items-center">
            <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
              <i className="fas fa-check text-primary"></i>
            </span>
            Before You Follow
          </h3>
          <ul className="space-y-3 pl-10">
            {byfItems.map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                variants={itemVariants}
              >
                <span className="text-primary mr-2">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h3 className="font-cinzel text-xl text-gray-200 mb-3 flex items-center">
            <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center mr-2">
              <i className="fas fa-xmark text-destructive"></i>
            </span>
            Do Not Interact
          </h3>
          <ul className="space-y-3 pl-10">
            {dniItems.map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                variants={itemVariants}
              >
                <span className="text-destructive mr-2">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}