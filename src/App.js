import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ProductPage from "./Pages/Product";
import VendorPage from "./Pages/Vendors";
import image1 from "./Assets/Vendors1.jpg"
import image2 from "./Assets/Vendors2.jpg"


// Sample Products
const products = [
  {
    id: 1,
    name: "Hair Vendor List",
    category: "Hair",
    price: "50",
    image1: image1,
    image2: image2,
    description:
      "The vendor list contains vendors that sell Virgin hair, frontals, bundles, closures, HD lace and etc. Some vendors also provide packaging for those that want to start a hair business. You do not need a business license. This vendor list is an electronic file (PDF). This list has up to 12 vendors to choose from.",
    relatedProducts: [
      { id: 1, name: "Wig Vendor", price: "30", image1: image1, image2: image2 },
      { id: 2, name: "Lace Vendor", price: "30", image1: image1, image2: image2 },
      { id: 3, name: "Raw Donor Vendor", price: "30", image1: image1, image2: image2 },
      { id: 4, name: "Bone Straight Vendor", price: "30", image1: image1, image2: image2 },
    ],
  },
  {
    id: 2,
    name: "Lip Gloss Vendor",
    category: "Lip Gloss",
    price: "50",
    image1: image1,
    image2: image2,
    description:
      "The vendor list contains vendors that sell lip gloss products such as lip stains, lip gels, and more. This vendor list is an electronic file (PDF) with up to 12 vendors to choose from.",
    relatedProducts: [
      { id: 1, name: "Lip Stain Vendor", price: "30", image1: image1, image2: image2 },
      { id: 2, name: "Lip Gel Vendor", price: "30", image1: image1, image2: image2 },
      { id: 3, name: "Lip Gloss Vendor", price: "30", image1: image1, image2: image2 },
      { id: 4, name: "Lip Liner Vendor", price: "30", image1: image1, image2: image2 },
    ],
  },
  {
    id: 3,
    name: "Cloth Vendor List",
    category: "Clothing",
    price: "50",
    image1: image1,
    image2: image2,
    description:
      "The vendor list contains vendors that sell various types of clothing, including male, female, and kid's clothing. This list is an electronic file (PDF) with up to 12 vendors to choose from.",
    relatedProducts: [
      { id: 1, name: "Male Cloth Vendor", price: "30", image1: image1, image2: image2 },
      { id: 2, name: "Female Cloth Vendor", price: "30", image1: image1, image2: image2 },
      { id: 3, name: "Kid's Cloth Vendor", price: "30", image1: image1, image2: image2 },
      { id: 4, name: "Lounge Wear Vendor", price: "30", image1: image1, image2: image2 },
    ],
  },
  {
    id: 4,
    name: "Lounge Wear Vendor List",
    category: "Lounge Wear",
    price: "50",
    image1: image1,
    image2: image2,
    description:
      "The vendor list contains vendors specializing in lounge wear for men and women. This is an electronic file (PDF) with up to 12 vendors to choose from.",
    relatedProducts: [
      { id: 1, name: "Casual Lounge Wear Vendor", price: "30", image1: image1, image2: image2 },
      { id: 2, name: "Silk Lounge Wear Vendor", price: "30", image1: image1, image2: image2 },
      { id: 3, name: "Cotton Lounge Wear Vendor", price: "30", image1: image1, image2: image2 },
      { id: 4, name: "Matching Sets Vendor", price: "30", image1: image1, image2: image2 },
    ],
  },
];


const App = () => {
  const [cart, setCart] = useState([]);
  console.log(cart)


  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/product/:id"
          element={<ProductPage products={products} onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/vendors/:category"
          element={<VendorPage products={products} />}
        />

      </Routes>
    </Router>
  );
};

export default App;
