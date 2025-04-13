import { useState } from "react";
import NavCard from "@/components/ui/NavCard";
import AboutModal from "@/components/modals/AboutModal";
import InterestsModal from "@/components/modals/InterestsModal";
import ByfDniModal from "@/components/modals/ByfDniModal";
import SocialsModal from "@/components/modals/SocialsModal";
import MusicModal from "@/components/modals/MusicModal";
import ServicesModal from "@/components/modals/ServicesModal";
import SecretMessagesModal from "@/components/modals/SecretMessagesModal";
import AdminLoginModal from "@/components/modals/AdminLoginModal";
import AdminDashboardModal from "@/components/modals/AdminDashboardModal";

export default function MainContent() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleAdminLogin = () => {
    setActiveModal(null);
    setIsAdminLoggedIn(true);
    setTimeout(() => {
      setActiveModal("admin-dashboard");
    }, 100);
  };

  return (
    <main className="animate-fade-in min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center">
          {/* Profile Image */}
          <div className="w-28 h-28 rounded-full border-2 border-[#C41E3A] p-1 mb-4">
            <img 
              src="https://i.ibb.co/pvQ6d1y5/46391e8d-b233-4034-88db-892d2fa27bdc.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          {/* Profile Name */}
          <h1 className="text-3xl font-bold text-[#C41E3A] mb-2">BERLINNAD</h1>
          
          {/* Quote */}
          <p className="text-center text-gray-300 italic mb-8 max-w-md">
            "Where darkness meets royalty, I rule with code and creativity."
          </p>
          
          {/* Navigation Cards */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-4">
            <NavCard 
              icon="fas fa-user-circle" 
              label="ABOUT ME" 
              onClick={() => openModal("about")}
            />
            <NavCard 
              icon="fas fa-star" 
              label="INTERESTS" 
              onClick={() => openModal("interests")}
            />
            <NavCard 
              icon="fas fa-exclamation-circle" 
              label="BYF / DNI" 
              onClick={() => openModal("byf-dni")}
            />
            <NavCard 
              icon="fas fa-share-alt" 
              label="SOCIALS" 
              onClick={() => openModal("socials")}
            />
            <NavCard 
              icon="fas fa-music" 
              label="MUSIC" 
              onClick={() => openModal("music")}
            />
            <NavCard 
              icon="fas fa-crown" 
              label="SERVICES" 
              onClick={() => openModal("services")}
            />
          </div>
          
          {/* Secret Messages (Full Width) */}
          <NavCard 
            icon="fas fa-comment-dots" 
            label="SECRET MESSAGES" 
            onClick={() => openModal("secret-messages")}
            fullWidth
          />
          
          {/* Admin Button */}
          <button 
            onClick={() => openModal("admin-login")}
            className="mt-12 text-xs text-gray-700 hover:text-gray-500"
          >
            ·
          </button>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "about" && (
        <AboutModal onClose={closeModal} />
      )}
      
      {activeModal === "interests" && (
        <InterestsModal onClose={closeModal} />
      )}
      
      {activeModal === "byf-dni" && (
        <ByfDniModal onClose={closeModal} />
      )}
      
      {activeModal === "socials" && (
        <SocialsModal onClose={closeModal} />
      )}
      
      {activeModal === "music" && (
        <MusicModal onClose={closeModal} />
      )}
      
      {activeModal === "services" && (
        <ServicesModal onClose={closeModal} />
      )}
      
      {activeModal === "secret-messages" && (
        <SecretMessagesModal onClose={closeModal} />
      )}
      
      {activeModal === "admin-login" && (
        <AdminLoginModal 
          onClose={closeModal} 
          onLogin={handleAdminLogin} 
        />
      )}
      
      {activeModal === "admin-dashboard" && isAdminLoggedIn && (
        <AdminDashboardModal onClose={closeModal} />
      )}
    </main>
  );
}
