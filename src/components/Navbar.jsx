import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">R</span>
              </div>
              RealEstates
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-slate-600 hover:text-primary font-medium transition duration-300">Home</Link>
            <Link to="/properties" className="text-slate-600 hover:text-primary font-medium transition duration-300">Properties</Link>
            <Link to="/about" className="text-slate-600 hover:text-primary font-medium transition duration-300">About</Link>
            <Link to="/services" className="text-slate-600 hover:text-primary font-medium transition duration-300">Services</Link>
            <Link to="/blogs" className="text-slate-600 hover:text-primary font-medium transition duration-300">Blog</Link>
            <Link to="/contact" className="ml-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-500/30">
              Contact Us
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full left-0 transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md font-medium">Home</Link>
            <Link to="/properties" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md font-medium">Properties</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md font-medium">About</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md font-medium">Services</Link>
            <Link to="/blogs" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md font-medium">Blog</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-3 mt-4 text-center bg-primary text-white rounded-md font-medium">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
