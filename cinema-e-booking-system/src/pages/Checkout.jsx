import React, { useState } from "react";

const Checkout = () => {
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "" });

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="mb-2">
        <label className="block text-gray-600">Card Number</label>
        <input type="text" name="cardNumber" value={payment.cardNumber} onChange={handleChange}
          className="w-full border rounded p-2"/>
      </div>
      <div className="mb-2">
        <label className="block text-gray-600">Expiry Date</label>
        <input type="text" name="expiry" value={payment.expiry} onChange={handleChange}
          className="w-full border rounded p-2"/>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => window.location.href = '/order-confirmation'}>
        Confirm</button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded"
        onClick={() => window.location.href = '/'}>Cancel</button>
      </div>
    </div>
  );
};

export default Checkout;