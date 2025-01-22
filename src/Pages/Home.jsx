import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick"; // Import Slider from react-slick
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import VendorCard from "../Components/Cards";
import CartDetail from "../Components/CartDetails";

const Home = ({ products }) => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const isItemInCart = prevCart.find((item) => item.id === product.id);
      if (isItemInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };


  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
      <Navbar cartCount={cart.length} onCartClick={() => setShowCart(true)} />
      <Header />

      {/* Best Sellers Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-poppins text-gray-800">Best Sellers</h2>
          <p className="font-nunito font-bold text-gray-400">Discover the most popular vendor lists</p>
        </div>

        {/* Grid for larger screens */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <VendorCard
              key={product.id}
              name={product.name}
              price={product.price}
              image1={product.image1}
              image2={product.image2}
              onImageClick={() => handleProductClick(product.id)}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>

        {/* Carousel for small screens */}
        <div className="sm:hidden">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <VendorCard
                  name={product.name}
                  price={product.price}
                  image1={product.image1}
                  image2={product.image2}
                  onImageClick={() => handleProductClick(product.id)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <div className="m-4">
        <Header/>
      </div>

      {/* New Arrivals Section */}
      <section className="bg-gray-50 py-10 px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">New Arrivals</h2>
          <p className="text-gray-600">Discover the latest vendor lists</p>
        </div>

        {/* Grid for larger screens */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <VendorCard
              key={product.id}
              name={product.name}
              price={product.price}
              image1={product.image1}
              image2={product.image2}
              onImageClick={() => handleProductClick(product.id)}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>

        {/* Carousel for small screens */}
        <div className="sm:hidden">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <VendorCard
                  name={product.name}
                  price={product.price}
                  image1={product.image1}
                  image2={product.image2}
                  onImageClick={() => handleProductClick(product.id)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <Footer />
      {showCart && (
        <CartDetail
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateCart={setCart}
        />
      )}
    </div>
  );
};

export default Home;
