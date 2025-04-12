import { Link, useLocation } from "wouter";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const { isOpen, toggleMenu } = useMobileMenu();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-primary text-2xl font-bold">Crimson</span>
              <span className="text-accent-400 text-2xl font-bold ml-1">Adventure</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`nav-link ${isActive('/') ? 'active-nav-link text-primary' : 'text-gray-600 hover:text-primary'} font-medium`}>
              Home
            </Link>
            <Link href="/adventures" className={`nav-link ${isActive('/adventures') ? 'active-nav-link text-primary' : 'text-gray-600 hover:text-primary'} font-medium`}>
              Adventures
            </Link>
            <Link href="/destinations" className={`nav-link ${isActive('/destinations') ? 'active-nav-link text-primary' : 'text-gray-600 hover:text-primary'} font-medium`}>
              Destinations
            </Link>
            <Link href="/about" className={`nav-link ${isActive('/about') ? 'active-nav-link text-primary' : 'text-gray-600 hover:text-primary'} font-medium`}>
              About
            </Link>
            <Link href="/contact" className={`nav-link ${isActive('/contact') ? 'active-nav-link text-primary' : 'text-gray-600 hover:text-primary'} font-medium`}>
              Contact
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-primary focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className={`${isActive('/') ? 'text-primary' : 'text-gray-600 hover:text-primary'} font-medium py-2 px-2 rounded hover:bg-gray-100`}>
                Home
              </Link>
              <Link href="/adventures" className={`${isActive('/adventures') ? 'text-primary' : 'text-gray-600 hover:text-primary'} font-medium py-2 px-2 rounded hover:bg-gray-100`}>
                Adventures
              </Link>
              <Link href="/destinations" className={`${isActive('/destinations') ? 'text-primary' : 'text-gray-600 hover:text-primary'} font-medium py-2 px-2 rounded hover:bg-gray-100`}>
                Destinations
              </Link>
              <Link href="/about" className={`${isActive('/about') ? 'text-primary' : 'text-gray-600 hover:text-primary'} font-medium py-2 px-2 rounded hover:bg-gray-100`}>
                About
              </Link>
              <Link href="/contact" className={`${isActive('/contact') ? 'text-primary' : 'text-gray-600 hover:text-primary'} font-medium py-2 px-2 rounded hover:bg-gray-100`}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
