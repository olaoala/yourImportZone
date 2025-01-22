import React from "react";
import Card from "./Components/Cards";

const VendorList = ({ vendors, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {vendors.map((vendor) => (
        <Card
          key={vendor.id}
          name={vendor.name}
          price={vendor.price}
          image1={vendor.image1}
          image2={vendor.image2}
          onAddToCart={() => onAddToCart(vendor)}
        />
      ))}
    </div>
  );
};

export default VendorList;
