import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SecretMessage } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface SecretMessagesModalProps {
  onClose: () => void;
}

export default function SecretMessagesModal({ onClose }: SecretMessagesModalProps) {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useLocalStorage<SecretMessage[]>("berlinnad_secretMessages", []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      // Create new message
      const newMessage: SecretMessage = {
        id: Date.now().toString(),
        text: message,
        date: new Date().toISOString(),
        read: false
      };
      
      // Add to messages
      setMessages([...messages, newMessage]);
      
      // Reset form
      setMessage("");
      
      // Show toast notification
      toast({
        title: "Message sent",
        description: "Your secret message has been sent anonymously.",
      });
    }
  };

  return (
    <Modal title="SECRET MESSAGES" icon="fas fa-comment-dots" onClose={onClose}>
      <div className="space-y-6">
        <div className="bg-[#800020] bg-opacity-20 p-4 rounded-md">
          <p className="text-center">
            Send me an anonymous message. I may or may not respond, but I will see it.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea 
            rows={5} 
            placeholder="Type your message here..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 focus:border-[#C41E3A] focus:outline-none" 
            required
          ></textarea>
          
          <button 
            type="submit" 
            className="w-full bg-[#C41E3A] py-2 rounded-md hover:bg-opacity-80 transition-all"
          >
            SEND ANONYMOUSLY
          </button>
        </form>
        
        <div className="space-y-3 mt-6">
          {messages.length > 0 ? (
            <div className="space-y-3">
              {messages.slice(0, 3).map((msg) => (
                <div key={msg.id} className="bg-[#800020] bg-opacity-10 p-3 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">
                      Anonymous • {new Date(msg.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
              {messages.length > 3 && (
                <p className="text-center text-sm text-gray-400">
                  + {messages.length - 3} more messages
                </p>
              )}
            </div>
          ) : (
            <div className="bg-[#800020] bg-opacity-10 p-3 rounded-md">
              <p className="text-sm italic text-gray-400">No messages to display yet...</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
