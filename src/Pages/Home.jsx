import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Slider from "react-slick";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import VendorCard from "../Components/Cards";
// import CartDetail from "../Components/CartDetails";
import Categories from '../Components/Categories';

const Home = ({ cart, products, onAddToCart,cartCount }) => { // ✅ Receive onAddToCart from App.js
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);


  const handleProductClick = (productId) => {
    console.log(productId,showCart)
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <Navbar cartCount={cartCount} cart={cart} onCartClick={() => setShowCart(true)} />
      <Header />
      

      {/* Best Sellers Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-poppins text-gray-800">Best Sellers</h2>
          <p className="font-nunito font-bold text-gray-400">
            Discover the most popular vendor lists
          </p>
        </div>

        <div className=" grid grid-cols-2 md:grid-cols-3 gap-4">
    {products
      .filter((product) => product.bestSeller === "yes") // Filter only best sellers
      .slice(0, 5) // Limit to first 5
      .map((product) => (
        <VendorCard
          key={product.id}
          name={product.name}
          price={product.price}
          image1={product.image1}
          image2={product.image2}
          onImageClick={() => handleProductClick(product.id)}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
  </div>
      </section>

      <Categories products={products} onAddToCart={onAddToCart} /> {/* ✅ Pass Function Down */}

      <Footer />
    </div>
  );
};

export default Home;
