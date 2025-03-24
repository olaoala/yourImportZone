import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../Components/Footer";

const ProductPage = ({ products, onAddToCart }) => {
    console.log(products)
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Start with null until product is found
  const [currentImage, setCurrentImage] = useState(null); // Default to null or empty string

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



  const productImages = Object.keys(product)
  .filter((key) => key.startsWith("image")) // Select only keys that start with "image"
  .map((key) => product[key]); // Get their values
  return (
    <div >
      <div className="flex mt-10 flex-col md:flex-row p-10 bg-gray-50">
         <div className="">
                <Link to="/" className="text-black hover:underline">
                  &larr; Back to Home
                </Link>
              </div>
            {/* Left Section (Image Carousel) */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
      <h1 className="text-2xl font-nunito font-bold text-gray-800 mb-1">{product.name}</h1>
      <p className="text-md font-bold  text-gray-500 mb-4">₦{product.price}</p>


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
      <div className="w-full mt-5 md:w-1/2 md:pl-8">
        <p className="font-nunito font-medium text-gray-400 mb-6">{product.description}</p>
        <p className="font-nunito text-sm text-gray-400 mb-2"> <b>No Refunds:</b>  Due to the nature of digital products & the ability to instantly access and download them, we do not offer refunds once the purchase is made. All sales are final.</p>
          <p className="font-nunito text-sm text-gray-400 mb-2">Our list is designed to meet diverse needs, providing you with the best options at your fingertips, whether for professional or personal endeavors. </p>
          <p className="font-nunito text-sm text-gray-400 mb-4">Ready to Get Started?
          For any questions or further information, contact us on Instagram <b>@Yourimportzone</b> </p>
        {/* Quantity and Add to Cart */}
        <div className="flex items-center mb-6">
        
          
          <button
            onClick={() => onAddToCart({ ...product })}
            className=" px-10 py-2 bg-black text-white rounded-md"
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
