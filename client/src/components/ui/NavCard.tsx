interface NavCardProps {
  icon: string;
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
}

export default function NavCard({ 
  icon, 
  label, 
  onClick,
  fullWidth = false 
}: NavCardProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#800020] text-white p-4 rounded-md flex items-center justify-center space-x-2
      hover:transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(196,30,58,0.5)]
      transition-all duration-300
      ${fullWidth ? 'w-full max-w-md' : ''}`}
    >
      <i className={icon}></i>
      <span className="font-cinzel">{label}</span>
    </button>
  );
}
