import React, { useState, useEffect } from "react";

const CartDetail = ({ cart, onClose, onRemoveFromCart, onClearCart }) => {
  const [email, setEmail] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const backendURL = "https://yourimportzone.netlify.app/.netlify/functions/verifyPayment";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const totalAmount = cart.reduce((total, item) => {
    const price = Number(item.discount.toString().replace(/,/g, ""));
    const quantity = Number(item.quantity) || 1;
    return total + price * quantity;
  }, 0);

  const verifyPayment = async (reference) => {
    try {
      const response = await fetch(backendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, customerEmail: email, productIds: cart.map((item) => item.id) }),
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentProcessing(false);
        setMailSent(true); // Show "Mail Sent" modal
        
        // Clear the cart immediately after payment is successful
        onClearCart(); 
      } else {
        alert(data.error || "Payment verification failed.");
        setPaymentProcessing(false);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      alert("An error occurred while verifying payment.");
      setPaymentProcessing(false);
    }
  };

  const handlePaystackPayment = () => {
    if (!email) {
      alert("Please enter your email before proceeding.");
      return;
    }

    setPaymentProcessing(true); // Show "Processing Payment" modal

    const handler = window.PaystackPop.setup({
      key: "pk_live_ce3ecc42f7d6a034f0ff7d006b58665a0d0fc48f", // Replace with actual key
      email,
      amount: totalAmount * 100,
      currency: "NGN",
      callback: function (response) {
        verifyPayment(response.reference);
      },
      onClose: function () {
        alert("Transaction was not completed, window closed.");
        setPaymentProcessing(false);
      },
    });

    handler.openIframe();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="text-red-500 font-bold text-xl">
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty!</p>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-gray-800 font-medium"></th>
                  <th className="py-2 text-gray-800 font-medium">Product</th>
                  <th className="py-2 text-gray-800 font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">
                      <button onClick={() => onRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 font-bold">
                        🗑️
                      </button>
                    </td>
                    <td className="py-4 flex items-center gap-4">
                      <img src={item.image1} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <span className="font-medium text-gray-700">{item.name}</span>
                    </td>
                    <td className="py-4 text-gray-700">₦{item.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="font-medium text-gray-700">Subtotal:</span>
          <span className="font-bold text-lg">₦{totalAmount.toLocaleString()}</span>
        </div>

        <div className="mt-6">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" />
          <button onClick={handlePaystackPayment} className="bg-black text-white py-2 rounded w-full">
            Pay to Get PDF
          </button>
        </div>
      </div>

      {/* Processing Payment Modal */}
      {paymentProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Processing Payment...</h2>
            <p className="text-gray-600">Please wait while we verify your payment.</p>
          </div>
        </div>
      )}

      {/* Mail Sent Modal */}
      {mailSent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Mail Sent ✅</h2>
            <p className="text-gray-600">Check your email for the vendor list.</p>
            <button onClick={() => { setMailSent(false); onClose(); }} className="mt-4 bg-black text-white py-2 px-4 rounded">
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetail;
