import React, { useState, useEffect } from "react";
import {Link,  useNavigate } from "react-router-dom";
import CartDetail from "./CartDetails"; // ✅ Import CartDetail

const Navbar = ({ cart, cartCount, onRemoveFromCart, onClearCart }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ Manage Cart Open state
  const navigate = useNavigate();


  
  

  // console.log("Navbar Props:", { onRemoveFromCart });
  const handleCartClick =() => {
    setIsCartOpen(true)
    console.log(isCartOpen)
  }
  const handleCartclose =() => {
    setIsCartOpen(false)
    console.log(isCartOpen)
  }

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

  return (
    <>
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
             <button
               className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
               onClick={() => navigate("/vendors/All Vendors")}
             >
               All Vendors
             </button>
             <button
               className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
               onClick={() => navigate("/vendors/Scents")}
             >
               Perfume Vendors
             </button>
             <button
               className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
               onClick={() => navigate("/vendors/Clothes")}
             >
               Clothes Vendors
             </button>
             <button
               className="block px-4 py-2 hover:bg-gray-100 text-left w-full"
               onClick={() => navigate("/vendors/Hair")}
             >
               Hair Vendors
             </button>
           </div>
            )}
          </div>

          {/* Logo */}
          <Link to="/">
            <div className="text-center">
              <h1 className="text-2xl font-nunito font-bold">YourImportZone</h1>
            </div>
          </Link>

          {/* Cart */}
          <div onClick={handleCartClick} className="relative flex items-center">
            <button >
              <span className="text-sm">🛒</span>
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ✅ Show Cart Modal when isCartOpen is true */}
      {isCartOpen && <CartDetail cart={cart} onRemoveFromCart={onRemoveFromCart} onClearCart={onClearCart}   onClose={handleCartclose}/>}
    </>
  );
};

export default Navbar;
