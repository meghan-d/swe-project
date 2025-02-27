import React, { useState } from "react";

const Checkout = () => {
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "" });

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <div className="mb-2 flex items-center">
        <label className="block text-gray-600 mr-4">Use Saved Card: </label>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Visa 1234</button>
      </div>
      <div className="mb-2">
        <label className="block text-gray-600">Card Number</label>
        <input type="text" name="cardNumber" value={payment.cardNumber} onChange={handleChange}
          className="w-full border rounded p-2"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-600">Expiry Date</label>
        <input type="text" name="expiry" value={payment.expiry} onChange={handleChange}
          className="w-full border rounded p-2"/>
      </div>
      <div className="mb-2 flex items-center">
        <label className="block text-gray-600 mr-4">Promo Code: </label>
        <input type="text" name="promotion" className="border rounded p-2 mr-4"/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
      </div>
      <h3 className="text-lg font-semibold">Total: $20</h3>
      <div className=" flex gap-4 mt-4">
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