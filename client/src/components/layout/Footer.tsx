import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, Layers } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-primary-400 text-2xl font-bold">Crimson</span>
              <span className="text-accent-400 text-2xl font-bold ml-1">Adventure</span>
            </Link>
            <p className="mb-4">Experience the thrill of adventure with expert guides and carefully crafted experiences.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition duration-300">Home</Link></li>
              <li><Link href="/adventures" className="hover:text-white transition duration-300">Adventures</Link></li>
              <li><Link href="/destinations" className="hover:text-white transition duration-300">Destinations</Link></li>
              <li><Link href="/about" className="hover:text-white transition duration-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Adventures</h3>
            <ul className="space-y-2">
              <li><Link href="/adventures" className="hover:text-white transition duration-300">Mountain Trekking</Link></li>
              <li><Link href="/adventures" className="hover:text-white transition duration-300">Rock Climbing</Link></li>
              <li><Link href="/adventures" className="hover:text-white transition duration-300">River Kayaking</Link></li>
              <li><Link href="/adventures" className="hover:text-white transition duration-300">Camping</Link></li>
              <li><Link href="/adventures" className="hover:text-white transition duration-300">Wildlife Safari</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to receive updates on new adventures and special offers.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500" 
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-lg transition duration-300"
                aria-label="Subscribe"
              >
                <Layers className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Crimson Adventure. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition duration-300">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition duration-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
