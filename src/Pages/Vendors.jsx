import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import VendorCard from "../Components/Cards"; // Import the VendorCard component

const VendorPage = ({ products, cartCount, onCartClick, onAddToCart }) => {
  const { category: routeCategory } = useParams();
  const [category] = useState(routeCategory);
    const navigate = useNavigate();
  console.log( category, routeCategory)

  

  // Filter products based on the selected category
  const filteredProducts = products.filter(
    (product) => category === routeCategory || product.category === routeCategory
  );
  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  console.log(filteredProducts, category, routeCategory)

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white font-poppins py-4 px-6 mt-20">
        <h1 className="text-2xl font-bold text-center">{routeCategory} List</h1>
      </header>

      {/* Back to Home */}
      <div className="mt-6 px-6">
        <Link to="/" className="text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
      </div>

      {/* Vendor List */}
      <div className="px-6 pb-10 mt-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <VendorCard
                key={product.id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                image1={product.image1}
                image2={product.image2}
                description={product.description} // Add this!
                onImageClick={() => handleProductClick(product.id)}
                onAddToCart={() => onAddToCart(product)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No vendors found for this category.</p>
        )}
      </div>

    
    </div>
  );
};

export default VendorPage;
