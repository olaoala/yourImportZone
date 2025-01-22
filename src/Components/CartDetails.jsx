import React from "react";

const CartDetail = ({ cart, onUpdateCart, onClose }) => {
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

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full md:w-2/3 lg:w-1/2 p-6 rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>

        
        {/* Cart Table */}
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
                <tr key={item.id} className="border-b">
                  {/* Product */}
                  <td className="py-4 flex items-center gap-4">
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </td>

                  {/* Price */}
                  <td className="py-4 text-gray-700">${item.price}</td>

                  {/* Quantity */}
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
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Order Summary */}
        <div className="mt-4 flex justify-between items-center">
          <span className="font-medium text-gray-700">Subtotal:</span>
          <span className="font-bold text-lg">${totalAmount}</span>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 rounded w-full hover:bg-gray-300"
          >
            Continue Shopping
          </button>
          <button className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
