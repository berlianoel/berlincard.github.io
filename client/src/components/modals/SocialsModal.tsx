import Modal from "@/components/ui/Modal";

interface SocialsModalProps {
  onClose: () => void;
}

export default function SocialsModal({ onClose }: SocialsModalProps) {
  return (
    <Modal title="SOCIALS" icon="fas fa-share-alt" onClose={onClose}>
      <div className="grid grid-cols-1 gap-4">
        <a 
          href="https://example.com/twitter" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-[#800020] bg-opacity-40 rounded-md hover:bg-opacity-60 transition-all"
        >
          <i className="fab fa-twitter text-xl w-8"></i>
          <span>Twitter</span>
        </a>
        
        <a 
          href="https://example.com/instagram" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-[#800020] bg-opacity-40 rounded-md hover:bg-opacity-60 transition-all"
        >
          <i className="fab fa-instagram text-xl w-8"></i>
          <span>Instagram</span>
        </a>
        
        <a 
          href="https://github.com/berlianoel" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-[#800020] bg-opacity-40 rounded-md hover:bg-opacity-60 transition-all"
        >
          <i className="fab fa-github text-xl w-8"></i>
          <span>GitHub</span>
        </a>
        
        <a 
          href="https://example.com/discord" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center p-3 bg-[#800020] bg-opacity-40 rounded-md hover:bg-opacity-60 transition-all"
        >
          <i className="fab fa-discord text-xl w-8"></i>
          <span>Discord</span>
        </a>
      </div>
    </Modal>
  );
}
