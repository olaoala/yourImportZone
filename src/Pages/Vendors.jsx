import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import VendorCard from "../Components/Cards"; // Import the VendorCard component

const VendorPage = ({ products, cartCount, onCartClick, onAddToCart }) => {
  const { category: routeCategory } = useParams();
  const [category] = useState(routeCategory || "All Vendors");

  // Filter products based on the selected category
  const filteredProducts = products.filter((product) =>
    category === "All Vendors" ? true : product.category === category
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />

      {/* Header */}
      <header className="bg-white font-poppins py-4 px-6 mt-20">
        <h1 className="text-2xl font-bold text-center">{category} List</h1>
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
                amount={product.amount}
                image1={product.image1}
                image2={product.image2}
                description={product.description} // Add this!
                onImageClick={() => console.log(`Product Clicked: ${product.id}`)}
                onAddToCart={() => onAddToCart(product)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No vendors found for this category.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} YourImportZone. All Rights Reserved.
      </footer>
    </div>
  );
};

export default VendorPage;
