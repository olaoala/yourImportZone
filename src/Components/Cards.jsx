import React, { useState } from "react";

const Card = ({ name, price, image1, image2,onImageClick, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden group mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="h-72 w-full">
        <img
          src={isHovered ? image2 : image1}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300"
          onClick={onImageClick}
        />
      </div>

      {/* Add to Cart Button */}
      {isHovered && (
        <button
          onClick={onAddToCart}
          className="absolute bottom-4 right-4 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md "
        >
          +
        </button>
      )}
       <button
          onClick={onAddToCart}
          className="absolute bottom-4 right-4 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md lg:hidden"
        >
          +
        </button>

      {/* Details */}
      <div className="text-left mt-3">
        <h3 className="font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600">${price}</p>
      </div>
    </div>
  );
};

export default Card;
