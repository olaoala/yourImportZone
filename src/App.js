import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductPage from "./Pages/Product";
import VendorPage from "./Pages/Vendors";
import Navbar from "./Components/Navbar";
import products from './Products.json';
// import CartDetails from "./Components/CartDetails";

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);




  // const handleCloseCart = () => {
  //   setIsCartOpen(false);
  // };
  // ✅ Global Add to Cart Function

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item.id === product.id);
      return isItemInCart
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
  };
  console.log(cart, cart.length)

  useEffect(() => {
    console.log("Updated Cart:", cart, "Length:", cart.length);
    console.log(cart, cart.length)
    setCartCount(cart.length)
    }, [cart, cart.length]); // Logs only when `cart` updates
  console.log(cart, cart.length)

  useEffect(() => {
    console.log("isCartOpen State:", isCartOpen); // Log the cart modal state
  }, [isCartOpen]);
  return (
    <Router>
      <Navbar cartCount={cartCount} cart={cart}   onCartClick={() => setIsCartOpen(true)}  /> ✅ Pass Cart Count to Navbar
      <Routes>
        <Route path="/" element={<Home cart={cart} products={products} cartCount={cartCount} onAddToCart={handleAddToCart} />} />
        <Route path="/product/:id" element={<ProductPage products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/vendors/:category" element={<VendorPage products={products} />} />
      </Routes>

    </Router>
  );
};

export default App;
