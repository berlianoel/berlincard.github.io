import Modal from "@/components/ui/Modal";

interface InterestsModalProps {
  onClose: () => void;
}

export default function InterestsModal({ onClose }: InterestsModalProps) {
  return (
    <Modal title="INTERESTS" icon="fas fa-star" onClose={onClose}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-cinzel text-[#C41E3A] flex items-center">
            <i className="fas fa-code mr-2"></i> Programming
          </h3>
          <p>Web development, mobile apps, and creative coding projects.</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-cinzel text-[#C41E3A] flex items-center">
            <i className="fas fa-paint-brush mr-2"></i> Digital Art
          </h3>
          <p>Creating dark fantasy and royal-themed illustrations.</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-cinzel text-[#C41E3A] flex items-center">
            <i className="fas fa-headphones mr-2"></i> Music
          </h3>
          <p>Alternative, dark electronic, and orchestral compositions.</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-cinzel text-[#C41E3A] flex items-center">
            <i className="fas fa-book mr-2"></i> Reading
          </h3>
          <p>Dark fantasy novels, mythological tales, and technical documentation.</p>
        </div>
      </div>
    </Modal>
  );
}
