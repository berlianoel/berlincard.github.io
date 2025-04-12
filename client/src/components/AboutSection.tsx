import { motion } from 'framer-motion';

export default function AboutSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <section 
      id="about"
      className="section mb-16 glass rounded-lg p-6 md:p-8"
    >
      <h2 className="font-cinzel text-3xl text-primary mb-6 flex items-center">
        <i className="fas fa-user-crown mr-3"></i> About Me
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div {...fadeInUp}>
          <h3 className="font-cinzel text-xl text-gray-200 mb-3">Basic Information</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-2">
                <i className="fas fa-id-card"></i>
              </span>
              <span>
                <span className="text-gray-400">Pronouns:</span> They/Them
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">
                <i className="fas fa-cake-candles"></i>
              </span>
              <span>
                <span className="text-gray-400">Age:</span> 17+
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">
                <i className="fas fa-brain"></i>
              </span>
              <span>
                <span className="text-gray-400">MBTI:</span> INFJ-T
              </span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="font-cinzel text-xl text-gray-200 mb-3">Random Facts About Me</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-2">
                <i className="fas fa-star"></i>
              </span>
              <span>I rule this dark kingdom with creativity and code</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">
                <i className="fas fa-star"></i>
              </span>
              <span>My vibe is cool, dark royal energy</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">
                <i className="fas fa-star"></i>
              </span>
              <span>I find beauty in the shadows and elegance in the night</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
