import React, { useState } from "react";

const Checkout = () => {
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "" });

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    console.log("Payment Confirmed:", payment);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input type="text" name="cardNumber" placeholder="Card Number" value={payment.cardNumber} onChange={handleChange} />
      <input type="text" name="expiry" placeholder="Expiry Date" value={payment.expiry} onChange={handleChange} />
      <button onClick={handleConfirm}>Confirm</button>
      <button>Cancel</button>
    </div>
  );
};

export default Checkout;