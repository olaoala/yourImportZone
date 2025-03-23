import React, { useState } from "react";
import Card from "./Cards";
import { useNavigate } from "react-router-dom";

const Categories = ({ products, onAddToCart }) => {
  console.log("✅ Products in Categories:", products);
  console.log("✅ onAddToCart in Categories:", onAddToCart);

  const [selectedCategory, setSelectedCategory] = useState("Hair");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Extract unique categories with their first product's `Catimg`
  const categoryImages = {};
  products.forEach((product) => {
    if (!categoryImages[product.category]) {
      categoryImages[product.category] = product.Catimg; // Use Catimg
    }
  });

  const categories = Object.keys(categoryImages);

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
        <p className="font-nunito font-bold text-gray-400">Shop by Categories</p>
      </div>

      {/* Category Circles */}
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
                src={categoryImages[category]} // Use `Catimg`
                alt={category}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="mt-2 text-sm font-medium">{category}</span>
          </button>
        ))}
      </div>

      {/* Product List for Selected Category */}
      {selectedCategory && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">{selectedCategory} Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(showAll ? filteredProducts : filteredProducts.slice(0, 5)).map((product) => (
              <Card
                key={product.id}
                name={product.name}
                price={product.price}
                amount= {product.amount}
                image1={product.image1}
                image2={product.image2}
                description={product.description}
                onImageClick={() => handleProductClick(product.id)}
                onAddToCart={() => onAddToCart(product)}
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
