import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ServiceOrder } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface ServicesModalProps {
  onClose: () => void;
}

export default function ServicesModal({ onClose }: ServicesModalProps) {
  const { toast } = useToast();
  const [orders, setOrders] = useLocalStorage<ServiceOrder[]>("berlinnad_serviceOrders", []);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    details: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new order
    const newOrder: ServiceOrder = {
      id: Date.now().toString(),
      name: formData.name,
      whatsapp: formData.whatsapp,
      service: "Custom Request",
      details: formData.details,
      date: new Date().toISOString(),
      completed: false
    };
    
    // Add to orders
    setOrders([...orders, newOrder]);
    
    // Reset form
    setFormData({
      name: "",
      whatsapp: "",
      details: ""
    });
    
    // Show toast notification
    toast({
      title: "Service request submitted",
      description: "Your request has been received. We'll contact you soon!",
    });
  };

  return (
    <Modal title="SERVICES" icon="fas fa-crown" onClose={onClose}>
      <div className="space-y-6">
        <div className="bg-[#800020] bg-opacity-20 p-4 rounded-md">
          <h3 className="text-xl mb-2">My Offerings</h3>
          <p>I provide various services in digital creation and problem-solving. Choose from the options below or request something custom.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="bg-[#800020] bg-opacity-20 p-3 rounded-md">
            <h4 className="text-lg">Web Development</h4>
            <p className="text-sm">Custom websites, landing pages, and web applications</p>
          </div>
          
          <div className="bg-[#800020] bg-opacity-20 p-3 rounded-md">
            <h4 className="text-lg">Digital Art</h4>
            <p className="text-sm">Character designs, illustrations, and profile pictures</p>
          </div>
          
          <div className="bg-[#800020] bg-opacity-20 p-3 rounded-md">
            <h4 className="text-lg">Editing Services</h4>
            <p className="text-sm">Photo editing, video editing, and audio enhancement</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl mb-4">Request My Services</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-300">Your Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:border-[#C41E3A] focus:outline-none" 
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-gray-300">WhatsApp Number</label>
              <input 
                type="text" 
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:border-[#C41E3A] focus:outline-none" 
                required
              />
            </div>
            
            <div>
              <label className="block mb-1 text-gray-300">Your Request Details</label>
              <textarea 
                rows={4} 
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:border-[#C41E3A] focus:outline-none" 
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-[#C41E3A] py-2 rounded-md hover:bg-opacity-80 transition-all"
            >
              SUBMIT REQUEST
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
