
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Spacer</h3>
            <p className="text-gray-300 mb-4">
              Your premier destination for finding and booking the perfect workspace.
            </p>
            <div className="flex space-x-4">
              <FiFacebook className="text-gray-400 hover:text-white cursor-pointer" />
              <FiTwitter className="text-gray-400 hover:text-white cursor-pointer" />
              <FiLinkedin className="text-gray-400 hover:text-white cursor-pointer" />
              <FiInstagram className="text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#spaces" className="text-gray-300 hover:text-white">Browse Spaces</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Coworking Spaces</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Meeting Rooms</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Event Spaces</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Private Offices</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FiMail className="mr-3" />
                <span className="text-gray-300">hello@spacer.com</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="mr-3" />
                <span className="text-gray-300">+254 712 345 678</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-3" />
                <span className="text-gray-300">Westlands, Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2026 Spacer. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;