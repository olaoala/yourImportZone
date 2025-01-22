import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8 mb-8">
          {/* About Us */}
          <div>
            <h2 className="font-bold text-lg mb-4">About Us</h2>
            <p className="text-sm text-gray-400">
              We provide business owners with trusted vendor lists to help them
              scale their businesses. Your success is our priority.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h2 className="font-bold text-lg mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="#vendors" className="hover:text-gray-300">
                  Vendors
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Us */}
          <div>
            <h2 className="font-bold text-lg mb-4">Contact Us</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: support@YourImportZone.com</li>
            </ul>
          </div>
       
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 text-sm text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} YourImportZone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
