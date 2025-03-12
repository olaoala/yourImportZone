import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const Card = ({ id, name, price, image1, image2, onImageClick, onAddToCart }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  // const navigate = useNavigate();

  const handleWishlistClick = () => {
    setIsLiked(!isLiked);
    console.log(`${name} ${!isLiked ? "added to wishlist ❤️" : "removed from wishlist 💔"}`);
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden group mb-8 shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <FaHeart className={`text-xl ${isLiked ? "text-red-500" : "text-gray-400"}`} />
      </button>

      {/* Image (Click to Go to Product Page) */}
      <div className="h-72 w-full cursor-pointer" onClick={onImageClick}>
        <img src={isHovered ? image2 : image1} alt={name} className="object-cover w-full h-full" />
      </div>

      {/* Product Details */}
      <div className="text-left mt-3 px-2">
        <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">${price}</p>

        {/* Add to Cart Button */}
        <button
        onClick={() => {
          console.log("🛒 Adding to cart:", name);
          onAddToCart({ name, price, image1 });
        }}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default Card;
