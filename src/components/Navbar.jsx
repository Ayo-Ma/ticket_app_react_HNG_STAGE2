import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from './../assets/logo.svg'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md fixed w-full top-0 z-50 shadow-sm mb-20">
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        
        Ticket<span className="text-gray-800">App</span>
      </h1>

 
      <div className="space-x-6 hidden md:flex ">
        <Link to="/" className="text-gray-700 hover:text-gray-600 transition-colors">Home</Link>
        <a href="#features"  onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-gray-600 transition-colors">Features</a>
        <a href="#pricing"  onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-gray-600 transition-colors">Pricing</a>
        <a href="#contact"  onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-gray-600 transition-colors">Contact</a>
      </div>

      
      <div className="space-x-3 hidden md:flex items-center">
        <Link to="/auth/login" className="text-gray-700 hover:text-gray-600 font-medium transition-colors">Login</Link>
        <Link
          to="/auth/signup"
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition-colors"
        >
          Get Started
        </Link>
      </div>

      
      <button 
        className="md:hidden text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
          <div className="flex flex-col p-6 space-y-4">
               <Link to="/"  onClick={() => setIsMenuOpen(false)}  className="text-gray-700 hover:text-gray-600 transition-colors">Home</Link>
            <a href="#features"  onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-gray-600 transition-colors">Features</a>
            <a href="#pricing"  onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-gray-600 transition-colors">Pricing</a>
            <a href="#contact"  onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-gray-600 transition-colors">Contact</a>
            <div className="border-t pt-4 space-y-3">
              <Link to="/auth/login" className="block text-gray-700 hover:text-gray-600 font-medium transition-colors">Login</Link>
              <Link
                to="/auth/signup"
                className="block bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow text-center transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;