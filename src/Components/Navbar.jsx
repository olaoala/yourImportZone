import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartDetail from "./CartDetails"; // ✅ Import CartDetail

const Navbar = ({ cart, cartCount }) => {
  const [isCartOpen, setIsCartOpen] = useState(false); // ✅ Manage Cart Open state



  return (
    <>
      <header className="bg-white text-black hover:bg-black hover:text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
      

          {/* Logo */}
          <Link to="/">
            <div className="text-center ">
              <h1 className="text-2xl font-nunito font-bold">YourImportZone</h1>
            </div>
          </Link>

          {/* Cart */}
          <div className="relative flex items-center">
            <button onClick={() => { console.log("Cart icon clicked"); setIsCartOpen(true); }}>
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
      {isCartOpen && <CartDetail cart={cart} onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
