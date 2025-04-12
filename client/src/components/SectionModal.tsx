import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface SectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: string;
  children: React.ReactNode;
}

export default function SectionModal({ isOpen, onClose, title, icon, children }: SectionModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#1a0a0a]/90 border-2 border-red-900 shadow-xl shadow-red-900/30"
        style={{animation: 'scaleIn 0.3s ease-out forwards'}}
      >
        <div className="flex items-center justify-between p-4 border-b border-red-900/50">
          <h2 className="text-xl font-cinzel text-red-600 flex items-center">
            <i className={`${icon} mr-2`}></i> {title}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-red-900/20 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          {children}
        </div>
      </div>
      

    </div>
  );
}