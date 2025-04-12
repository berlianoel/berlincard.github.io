import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminModal from './AdminModal';

interface FooterProps {
  scrollToTop: () => void;
  showAdminModal: () => void;
}

export default function Footer({ scrollToTop, showAdminModal }: FooterProps) {
  const [showAdmin, setShowAdmin] = useState(false);
  
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAdmin(true);
  };
  
  const closeAdminModal = () => {
    setShowAdmin(false);
  };
  
  return (
    <>
      <motion.footer 
        className="max-w-5xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4">
          <motion.button 
            id="back-to-top" 
            className="px-4 py-2 glass rounded-md hover:bg-primary/30 transition-all duration-300"
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-arrow-up mr-2"></i> Back to Top
          </motion.button>
        </div>
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Berlinnad's Royal Domain | All Rights Reserved
        </p>
        <p className="text-gray-600 text-xs mt-1">
          <a 
            href="#" 
            id="admin-link" 
            className="hover:text-gray-400 transition-colors duration-300"
            onClick={handleAdminClick}
          >
            Admin
          </a>
        </p>
      </motion.footer>
      
      {showAdmin && <AdminModal onClose={closeAdminModal} />}
    </>
  );
}
