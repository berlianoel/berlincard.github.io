import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

export default function AdminLoginModal({ onClose, onLogin }: AdminLoginModalProps) {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check admin credentials
    if (credentials.username === "berlin" && credentials.password === "admin") {
      onLogin();
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  return (
    <Modal title="ADMIN ACCESS" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-300">Username</label>
          <input 
            type="text" 
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:border-[#C41E3A] focus:outline-none" 
            required
          />
        </div>
        
        <div>
          <label className="block mb-1 text-gray-300">Password</label>
          <input 
            type="password" 
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-700 rounded p-2 focus:border-[#C41E3A] focus:outline-none" 
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-[#C41E3A] py-2 rounded-md hover:bg-opacity-80 transition-all"
        >
          LOGIN
        </button>
      </form>
    </Modal>
  );
}
