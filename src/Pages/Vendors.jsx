import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const VendorPage = ({ products, cartCount, onCartClick }) => {
  const { category: routeCategory } = useParams();
  const [category] = useState(routeCategory || "All Vendors");

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
            {filteredProducts.map((vendor) => (
              <div key={vendor.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={vendor.image1}
                  alt={vendor.name}
                  className="h-48 w-full object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-bold mb-2">{vendor.name}</h2>
                <p className="text-gray-300 text-sm line-clamp-2 mt-1">{vendor.description}</p>
                <p className="text-gray-900 font-semibold mb-4">₦{vendor.price}</p>
                <Link to={`/product/${vendor.id}`}>
                  <button className="my-4 px-10 py-2 bg-black text-white rounded-md">
                    View Details
                  </button>
                </Link>
              </div>
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
