import Modal from "@/components/ui/Modal";

interface MusicModalProps {
  onClose: () => void;
}

export default function MusicModal({ onClose }: MusicModalProps) {
  return (
    <Modal title="MUSIC" icon="fas fa-music" onClose={onClose}>
      <div className="space-y-4">
        <p className="text-center italic mb-4">Current moods and inspirations</p>
        
        <div className="w-full">
          <iframe 
            src="https://open.spotify.com/embed/playlist/17O7Wg5VzmpqTqdlhbhKpl?utm_source=generator" 
            width="100%" 
            height="380" 
            style={{ borderRadius: '12px' }}
            frameBorder="0" 
            allow="autoplay clipboard-write encrypted-media fullscreen picture-in-picture"
          ></iframe>
        </div>
      </div>
    </Modal>
  );
}
