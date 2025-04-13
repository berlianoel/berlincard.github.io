import Modal from "@/components/ui/Modal";

interface ByfDniModalProps {
  onClose: () => void;
}

export default function ByfDniModal({ onClose }: ByfDniModalProps) {
  return (
    <Modal title="BYF / DNI" icon="fas fa-exclamation-circle" onClose={onClose}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-cinzel text-green-600 mb-3">Before You Follow</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>I post about programming, digital art, and dark aesthetics</li>
            <li>I occasionally use strong language</li>
            <li>I value creativity and respect</li>
            <li>I may post content with dark themes</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-cinzel text-red-600 mb-3">Do Not Interact</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Bigots, racists, or those who discriminate against others</li>
            <li>People under 16 years old</li>
            <li>Those who don't respect boundaries</li>
            <li>Content thieves or plagiarists</li>
          </ul>
        </div>
        
        <p className="italic text-gray-400 mt-4">
          My realm has rules. Respect them, and we'll get along well.
        </p>
      </div>
    </Modal>
  );
}
