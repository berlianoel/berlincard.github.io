import Modal from "@/components/ui/Modal";

interface AboutModalProps {
  onClose: () => void;
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <Modal title="ABOUT ME" icon="fas fa-user-circle" onClose={onClose}>
      <div className="space-y-4">
        <h3 className="text-xl font-cinzel text-[#C41E3A] mb-4">BASIC INFORMATION</h3>
        
        <div className="flex items-center space-x-2">
          <i className="fas fa-id-card text-[#C41E3A]"></i>
          <span>Pronouns: They/Them</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <i className="fas fa-birthday-cake text-[#C41E3A]"></i>
          <span>Age: 17+</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <i className="fas fa-brain text-[#C41E3A]"></i>
          <span>MBTI: INFJ-T</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <i className="fas fa-map-marker-alt text-[#C41E3A]"></i>
          <span>Location: Yogyakarta, Indonesia</span>
        </div>
        
        <div className="bg-[#800020] bg-opacity-30 p-4 rounded-md mt-6">
          <p className="text-center">
            Selamat datang di kerajaan digital saya! Saya adalah Berlinnad, penguasa kegelapan modern yang menggabungkan estetika kerajaan kuno dengan teknologi. Di sini, kode dan kreativitas adalah senjata saya, dan kegelapan adalah tempat saya menemukan keindahan.
          </p>
        </div>
      </div>
    </Modal>
  );
}
