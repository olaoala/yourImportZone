import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const Card = ({ name, price, image1, image2, onImageClick, onAddToCart, onWishlistToggle = () => {} }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleWishlistClick = () => {
    setIsLiked(!isLiked);
    onWishlistToggle(!isLiked); // Only call if the function is provided
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden group mb-8 shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button (Top Right) */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
      >
        <FaHeart className={`text-xl ${isLiked ? "text-red-500" : "text-gray-400"}`} />
      </button>

      {/* Image */}
      <div className="h-72 w-full cursor-pointer">
        <img
          src={isHovered ? image2 : image1}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300"
          onClick={onImageClick}
        />
      </div>

      {/* Product Details */}
      <div className="text-left mt-3 px-2">
        <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
        <p className="text-gray-600 text-sm">${price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          className="mt-3 w-full bg-black text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
