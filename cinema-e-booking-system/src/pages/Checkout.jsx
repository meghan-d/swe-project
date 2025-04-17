import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "" });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(20);
  const [error, setError] = useState("");
  const [savedCard, setSavedCard] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios.get(`http://localhost:5001/edit-profile?userId=${userId}`)
        .then((res) => {
          const card = res.data.paymentCards?.[0];
          if (card) {
            setSavedCard(card);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch saved card:", err);
        });
    }
  }, []);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handlePromoApply = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/promo/${promoCode}`);
      setDiscount(res.data.discount);
      setError("");
    } catch (err) {
      setDiscount(0);
      setError("Invalid or expired promo code.");
    }
  };

  const handleUseSavedCard = () => {
    if (savedCard) {
      setPayment({
        cardNumber: savedCard.cardNumber,
        expiry: savedCard.expirationDate,
      });
    }
  };

  const discountedTotal = (total - total * (discount / 100)).toFixed(2);

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-section">
        <label>Use Saved Card:</label>
        <button className="yellow-btn" onClick={handleUseSavedCard}>
          {savedCard ? `${savedCard.cardType} ****${savedCard.cardNumber.slice(-4)}` : "No saved card"}
        </button>
      </div>

      <div className="checkout-section">
        <label>Card Number</label>
        <input type="text" name="cardNumber" value={payment.cardNumber} onChange={handleChange} />
      </div>

      <div className="checkout-section">
        <label>Expiry Date</label>
        <input type="text" name="expiry" value={payment.expiry} onChange={handleChange} />
      </div>

      <div className="checkout-section promo-section">
        <label>Promo Code:</label>
        <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
        <button className="yellow-btn" onClick={handlePromoApply}>Apply</button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <h3 className="checkout-total">
        Total: ${discount > 0 ? `${discountedTotal} (Saved ${discount}%)` : total}
      </h3>

      <div className="checkout-actions">
        <button className="green-btn" onClick={() => window.location.href = '/order-confirmation'}>Confirm</button>
        <button className="gray-btn" onClick={() => window.location.href = '/'}>Cancel</button>
      </div>
    </div>
  );
};

export default Checkout;
