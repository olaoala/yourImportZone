import React, { useState } from "react";
import Card from "./Cards";
import { useNavigate } from "react-router-dom";

const Categories = ({ products, onAddToCart }) => { // ✅ Receive onAddToCart from Home/App
  console.log("✅ Products in Categories:", products);
  console.log("✅ onAddToCart in Categories:", onAddToCart);

  const [selectedCategory, setSelectedCategory] = useState("Hair");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const categories = [...new Set(products.map((product) => product.category))];

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : [];

  return (
    <div className="px-6 py-10">
       <div className="text-center mb-8">
          <h2 className="text-3xl font-poppins text-gray-800">Categories</h2>
          <p className="font-nunito font-bold text-gray-400">
            Shop by Categories
          </p>
        </div>
        <div className="grid grid-cols-3 gap-20 justify-center items-center mx-auto w-fit">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedCategory(category);
              setShowAll(false);
            }}
            className="flex flex-col items-center focus:outline-none"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <img
                src={`/images/${category.toLowerCase()}.jpg`}
                alt={category}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="mt-2 text-sm font-medium">{category}</span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">{selectedCategory} Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(showAll ? filteredProducts : filteredProducts.slice(0, 5)).map((product) => (
              <Card
                key={product.id}
                name={product.name}
                price={product.price}
                image1={product.image1}
                image2={product.image2}
                onImageClick={() => handleProductClick(product.id)}
                onAddToCart={() => onAddToCart(product)} // ✅ Use Global Function
              />
            ))}
          </div>

          {!showAll && filteredProducts.length > 5 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
