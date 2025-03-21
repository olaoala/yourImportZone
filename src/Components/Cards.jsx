import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const Card = ({ id, name, price, image1, image2,description, onImageClick, onAddToCart }) => {

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
        <p className="text-gray-400 text-md font-bold">₦{price}</p>

          {/* Short Description (Limit to 2 lines) */}
          <p className="text-gray-300 text-sm line-clamp-2 mt-1">{description}</p>



        {/* Add to Cart Button */}
        <button
        onClick={() => {
          console.log("🛒 Adding to cart:", name);
          onAddToCart({ name, price, image1 });
        }}
        className="my-4 px-10 py-2 bg-black text-white rounded-md"
      >
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default Card;
