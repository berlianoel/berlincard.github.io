interface EntrancePortalProps {
  onEnter: () => void;
  fadeOut: boolean;
}

export default function EntrancePortal({ onEnter, fadeOut }: EntrancePortalProps) {
  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen text-white bg-center bg-no-repeat bg-cover
      ${fadeOut ? 'animate-fade-out' : 'animate-fade-in'}`}
      style={{
        backgroundImage: "url('https://i.ibb.co/gFHGbmwB/Crimson-Portal.jpg')"
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-center text-[#C41E3A] font-cinzel mb-12 tracking-wider text-shadow">
          BERLINNAD'S REALM
        </h1>
        <div className="flex justify-center w-full">
          <button 
            onClick={onEnter}
            className="px-10 py-3 text-2xl bg-[#800020] bg-opacity-50 border-2 border-[#C41E3A] rounded-md hover:bg-[#C41E3A] transition-all duration-300 font-cinzel w-56 flex justify-center items-center mx-auto"
          >
            ENTER
          </button>
        </div>
        <p className="mt-8 text-lg text-gray-300">Click to enter the royal domain</p>
      </div>
    </div>
  );
}
