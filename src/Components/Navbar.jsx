import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount, onCartClick, }) => {
  const [category, setCategory] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(category)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("#vendor-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleCategoryClick = (category) => {
    setCategory(category); // Update category in parent component
    setDropdownOpen(false); // Close the dropdown
  };

  return (
    <header className="bg-white text-black hover:bg-black hover:text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Vendor Dropdown */}
        <div id="vendor-dropdown" className="relative flex items-center space-x-4">
          <button
            className="font-bold font-poppins text-sm hover:text-gray-400 focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Vendors
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-48">
           
           <Link to={`/vendors/All Vendors`}>
              <button
                onClick={() => handleCategoryClick("All Vendors")}
                className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
              >
                All Vendors
                </button>
              </Link>
            
              <Link to={`/vendors/Lip Gloss`}>
              <button
                onClick={() => handleCategoryClick("Lip Gloss")}
                className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
              >
                Lip Gloss Vendors
              </button>
              </Link>
              <Link to={`/vendors/Clothing`}>
              <button
                onClick={() => handleCategoryClick("Clothing")}
                className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
              >
                Lounge Wear Vendors
                </button>
              </Link>
              <Link to={`/vendors/Hair`}>
              <button
                onClick={() => handleCategoryClick("Hair")}
                className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
              >
                Hair Vendors
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Logo */}
        <Link to={'/'}>
        <div className="text-center">
          <h1 className="text-2xl font-pacific font-bold">YourImportZone</h1>
        </div>
        </Link>
      

        {/* Cart */}
        <div className="relative flex items-center">
          <button onClick={onCartClick} className="text-lg flex items-center">
            <span className="font-bold font-poppins text-sm">Cart</span>
          </button>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
