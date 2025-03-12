import React, { useState, useEffect } from "react";

const CartDetail = ({cart, onUpdateCart, onClose }) => {
  const [email, setEmail] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [reference, setReference] = useState("");
const [customerEmail, setCustomerEmail] = useState("");
const [productIds, setProductIds] = useState([]);
const [isOpen, setIsOpen] = useState(true); // Track modal state

const backendURL = "http://localhost:8888/.netlify/functions/verifyPayment"; // Netlify will proxy this to the function


  console.log(cart, reference, paymentReference, customerEmail, productIds, setPaymentReference )

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const verifyPayment = async (reference, customerEmail, productIds) => {
    try {
      const response = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, customerEmail, productIds }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Payment verified! Check your email for the PDF.");
      } else {
        alert(data.error || "Payment verification failed.");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("An error occurred while verifying payment.");
    }
  };
  

  const handlePaystackPayment = () => {
    if (!email) {
      alert("Please enter your email before proceeding.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_live_bfcec00387948c33e9b9a146735988ba0d67315f", // Replace with actual key
      email,
      amount: totalAmount * 100, // Convert to kobo
      currency: "NGN",
      callback: function (response) {
        console.log("Payment Successful:", response);
      
        // Update states here
        setReference(response.reference);
        setCustomerEmail(email);
        setProductIds(cart.map((item) => item.id));
      
        // Call verifyPayment using state variables
        verifyPayment(response.reference, email, cart.map((item) => item.id));
      },
      
      
      onClose: function () {
        alert("Transaction was not completed, window closed.");
      },
    });

    handler.openIframe();
  };


  const handleClose = () => {
    setIsOpen(false);
  };
  
  if (!isOpen) return null; // Don't render if modal is closed
  
 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <button onClick={handleClose} className="text-red-500 font-bold text-xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
  
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty!</p>
        ) : (
          // ✅ Wrap this in a scrollable div
          <div className="max-h-[50vh] overflow-y-auto">
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
                  <tr key={item.id} className="border-b">
                    <td className="py-4 flex items-center gap-4">
                      <img
                        src={item.image1}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <span className="font-medium text-gray-700">
                        {item.name}
                      </span>
                    </td>
                    <td className="py-4 text-gray-700">${item.price}</td>
                    <td className="py-4">
                      <span className="font-medium">{item.quantity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
  
        <div className="mt-4 flex justify-between items-center">
          <span className="font-medium text-gray-700">Subtotal:</span>
          <span className="font-bold text-lg">${totalAmount}</span>
        </div>
  
        {/* Email Input & Payment Button */}
        <div className="mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handlePaystackPayment}
            className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600"
          >
            Pay to Get PDF
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default CartDetail;
