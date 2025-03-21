import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className=" gap-8 mb-8">
          {/* About Us */}
          <div>
            <h2 className="font-bold text-lg mb-4">About Us</h2>
            <p className="text-sm text-gray-400">
              We provide business owners with trusted vendor lists to help them
              scale their businesses. Your success is our priority.
            </p>
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
