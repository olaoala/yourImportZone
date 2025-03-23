import React from "react";

const PaymentStatusModal = ({ isOpen, status, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        {status === "verifying" && (
          <>
            <p className="text-lg font-semibold">✅ Payment Verified</p>
            <p className="text-sm text-gray-600 mt-2">Your mail is being sent...</p>
            <div className="mt-4 flex justify-center">
              <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          </>
        )}

        {status === "sent" && (
          <>
            <p className="text-lg font-semibold">📩 Mail Sent</p>
            <p className="text-sm text-gray-600 mt-2">Check your inbox for the vendor list.</p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Okay
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusModal;
