import React, { useState } from "react";

const Card = ({ id, name, price, amount, image1,discount,  image2,description, onImageClick, onAddToCart }) => {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl overflow-hidden group mb-8 shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Image (Click to Go to Product Page) */}
      <div onClick={onImageClick}>
      <div className="h-72 w-full cursor-pointer" >
        <img src={isHovered ? image2 : image1} alt={name} className="object-cover w-full h-full" />
      </div>

      {/* Product Details */}
      <div className="text-left mt-3 px-2">
        <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
        {/* <span className="text-red-500 font-bold text-lg">₦{discount}</span> */}

        <p className="text-gray-400  text-md font-bold">₦{price}</p>

          {/* Short Description (Limit to 2 lines) */}
          <p className="text-gray-300 text-sm line-clamp-2 mt-1">{description}</p>



        {/* Add to Cart Button */}
      
      </div>

      </div>
     
      <button
        onClick={() => {
          console.log("🛒 Adding to cart:", name);
          onAddToCart({ name, discount, image1 });
        }}
        className="my-4 px-10 m-2 py-2 bg-black text-white rounded-md"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
