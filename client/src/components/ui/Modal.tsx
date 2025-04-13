interface ModalProps {
  title: string;
  icon?: string;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ 
  title, 
  icon, 
  onClose, 
  children,
  maxWidth = "max-w-md"
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div 
        className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className={`bg-[#050505] border-2 border-[#C41E3A] rounded-lg w-full ${maxWidth} mx-4 p-6 max-h-[80vh] overflow-y-auto relative z-10`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-cinzel text-[#C41E3A] flex items-center">
            {icon && <i className={`${icon} mr-2`}></i>} {title}
          </h2>
          <button 
            className="text-white hover:text-[#C41E3A]"
            onClick={onClose}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        {children}
      </div>
    </div>
  );
}
