import React, { useState, useEffect } from "react";
// import axios from "axios";

const CartDetail = ({ cart, onUpdateCart, onClose, onSendEmail }) => {
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  // const [selectedProducts, setSelectedProducts] = useState([]);
  console.log(paymentReference) 

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleMockPayment = () => {
    // Simulate a successful payment
    const mockPaymentReference = "MOCK_PAYMENT_REFERENCE_12345";
    setPaymentReference(mockPaymentReference);
    setIsEmailModalVisible(true);
  };

  // const handleProductSelection = (productId) => {
  //   setSelectedProducts((prevSelected) =>
  //     prevSelected.includes(productId)
  //       ? prevSelected.filter((id) => id !== productId) // Deselect if already selected
  //       : [...prevSelected, productId] // Add if not selected
  //   );
  // };

  const handleSendEmail = () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    // Automatically pass all items in the cart
    const productIds = cart.map((item) => item.id);

    // Call the parent callback with email and all product IDs
    onSendEmail(email, productIds);
    setIsEmailModalVisible(false); // Close email modal after sending
  };

  const handleIncrement = (id) => {
    onUpdateCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    onUpdateCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const handleDelete = (id) => {
    onUpdateCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg">
        <button onClick={onClose} className="text-red-500 font-bold text-xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty!</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-gray-800 font-medium">Product</th>
                <th className="py-2 text-gray-800 font-medium">Price</th>
                <th className="py-2 text-gray-800 font-medium">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="py-4 flex items-center gap-4">
            
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </td>
                  <td className="py-4 text-gray-700">${item.price}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="font-medium text-gray-700">Subtotal:</span>
          <span className="font-bold text-lg">${totalAmount}</span>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 rounded w-full hover:bg-gray-300"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleMockPayment}
            className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600"
          >
            Checkout
          </button>
        </div>

        {isEmailModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
              <h3 className="mb-4 text-lg font-semibold">Enter Your Email</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="mb-4">
                <button
                  onClick={handleSendEmail}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Send Email with Selected Products
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetail;
