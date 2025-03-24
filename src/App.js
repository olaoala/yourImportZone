import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductPage from "./Pages/Product";
import VendorPage from "./Pages/Vendors";
import Navbar from "./Components/Navbar";
import products from './Products.json';



const App = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state




  // const handleRemoveFromCart = (id) => {
  //   console.log("Removing item from cart:", id); // Debugging
  //   setCart(cart.filter(item => item.id !== id));
  // };
  const handleRemoveFromCart = (itemId) => {
    console.log("📌 handleRemoveFromCart in App.js:", itemId); // ✅ Debug log
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };
  
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item.id === product.id);

      if (isItemInCart) {
        setShowModal(true); // Show modal when item is already in cart
        return prevCart; // Don't add again
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  console.log(cart, cart.length,setIsCartOpen)



  useEffect(() => {
    console.log("Updated Cart:", cart, "Length:", cart.length);
    console.log(cart, cart.length)
    setCartCount(cart.length)
    }, [cart, cart.length]); // Logs only when `cart` updates
  console.log(cart, cart.length)

  useEffect(() => {
    console.log("isCartOpen State:", isCartOpen);
 // Log the cart modal state
  }, [isCartOpen,]);
  return (
    <Router>
      <Navbar cartCount={cartCount} cart={cart} onRemoveFromCart={handleRemoveFromCart}  />
      <Routes>
        <Route path="/" element={<Home cart={cart} products={products} cartCount={cartCount} onAddToCart={handleAddToCart} />} />
        <Route path="/product/:id" element={<ProductPage products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/vendors/:category" element={<VendorPage key={window.location.pathname} products={products}  onAddToCart={handleAddToCart} />} />
        

      </Routes>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg shadow-md text-center">
            <p className="text-lg font-semibold mb-4">Already in Cart</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-black text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </Router>

    
  );
  
};


export default App;
