import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProductPage = ({ products, onAddToCart }) => {
    console.log(products)
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Start with null until product is found
  const [currentImage, setCurrentImage] = useState(null); // Default to null or empty string
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (products && products.length > 0) {
        console.log(products)
      const foundProduct = products.find((product) => product.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setCurrentImage(foundProduct.image1); // Set the initial image once product is found
      }
    }
  }, [id, products]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (image) => {
    setCurrentImage(image);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const productImages = Object.keys(product)
  .filter((key) => key.startsWith("image")) // Select only keys that start with "image"
  .map((key) => product[key]); // Get their values
  return (
    <div >
      <Navbar/>
      <div className="flex mt-10 flex-col md:flex-row p-16 bg-gray-50">
            {/* Left Section (Image Carousel) */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <div className="flex justify-center items-center mb-4">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-96 rounded-md object-cover"
          />
        </div>
        <div className="flex justify-center gap-2 mt-2 flex-wrap">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(img)}
                className={`w-16 h-16 border ${
                  currentImage === img ? "border-black" : "border-gray-300"
                } rounded-md overflow-hidden`}
              >
                <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
      </div>

      {/* Right Section (Product Details) */}
      <div className="w-full mt-16 md:w-1/2 md:pl-8">
        <h1 className="text-2xl font-nunito font-bold text-gray-800 mb-1">{product.name}</h1>
        <p className="text-md font-bold  text-gray-500 mb-4">₦{product.price}</p>
        <p className="font-nunito font-medium text-gray-400 mb-6">{product.description}</p>

        {/* Quantity and Add to Cart */}
        <div className="flex items-center space-x-4 mb-6">
          <button onClick={decrementQuantity} className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
            -
          </button>
          <span className="text-xl">{quantity}</span>
          <button onClick={incrementQuantity} className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
            +
          </button>
          
          <button
            onClick={() => onAddToCart({ ...product })}
            className="ml-4 px-10 py-2 bg-black text-white rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
      </div>
      <Footer/>

  

    </div>
  );
};

export default ProductPage;
