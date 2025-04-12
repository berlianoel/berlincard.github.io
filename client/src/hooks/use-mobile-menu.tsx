import { useState, useEffect } from 'react';

export function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Close menu when user navigates to another page
  useEffect(() => {
    if (isOpen) {
      const handleNavigate = () => {
        setIsOpen(false);
      };

      document.addEventListener('click', handleNavigate);
      return () => document.removeEventListener('click', handleNavigate);
    }
  }, [isOpen]);

  return { isOpen, toggleMenu };
}
