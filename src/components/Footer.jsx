import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">R</span>
              </div>
              <span className="text-2xl font-bold text-white">RealEstates</span>
            </div>
            <p className="mb-6 leading-relaxed">
              We help you find the best properties in the most desirable locations. Your dream home is just a click away.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition duration-300"><FiFacebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition duration-300"><FiTwitter size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition duration-300"><FiInstagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition duration-300"><FiLinkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-primary transition duration-300 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">About Us</Link></li>
              <li><Link to="/properties" className="hover:text-primary transition duration-300 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Properties</Link></li>
              <li><Link to="/services" className="hover:text-primary transition duration-300 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Services</Link></li>
              <li><Link to="/blogs" className="hover:text-primary transition duration-300 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Latest News</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition duration-300 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Property Types</h3>
            <ul className="space-y-4">
              <li><Link to="/properties?type=Apartment" className="hover:text-primary transition duration-300">Apartments</Link></li>
              <li><Link to="/properties?type=Villa" className="hover:text-primary transition duration-300">Villas</Link></li>
              <li><Link to="/properties?type=Commercial" className="hover:text-primary transition duration-300">Commercial</Link></li>
              <li><Link to="/properties?type=Plot" className="hover:text-primary transition duration-300">Plots & Lands</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <FiMapPin className="text-primary mt-1" size={20} />
                <span>123 Real Estate St, Business Center, NY 10001</span>
              </li>
              <li className="flex items-center gap-4">
                <FiPhone className="text-primary" size={20} />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-4">
                <FiMail className="text-primary" size={20} />
                <span>info@realestates.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} RealEstates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
