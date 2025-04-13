import { useState, useEffect } from "react";
import EntrancePortal from "@/components/EntrancePortal";
import MainContent from "@/components/MainContent";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleEnter = () => {
    setFadeOut(true);
    setTimeout(() => {
      setEntered(true);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {!entered && (
        <EntrancePortal 
          onEnter={handleEnter} 
          fadeOut={fadeOut}
        />
      )}
      
      {entered && <MainContent />}
    </div>
  );
}
