import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "" });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(20);
  const [error, setError] = useState("");
  //const [savedCard, setSavedCard] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '/order-confirmation';
  }
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      console.log("here1")
      axios.get(`http://localhost:5001/edit-profile?userId=${userId}`)
        .then((res) => {
          console.log("getting here")
          //const card = res.data.paymentCards?.[0];
          const card = res.data.paymentCards || [];
          if (card) {
            setSavedCards(card);
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

  const handleUseSavedCard = (card) => {
      setPayment({
        cardType: card.cardType,
        cardNumber: card.cardNumber,
        expiry: card.expirationDate,
        billingStreet: card.billingStreet,
        billingCity: card.billingCity,
        billingState: card.billingState,
        billingZip: card.billingZip
      });
  };
  //console.log("Card type:", savedCard.cardType);
  //console.log(savedCard.cardNumber.slice(-4));
  console.log(parseInt(discount));
  const discountedTotal = (total - total * (parseInt(discount) / 100)).toFixed(2);
  console.log(discountedTotal)
  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>

        <div className="checkout-section">
          <label>Use Saved Card:</label>
          <div className="savedcard-buttons">
            {savedCards.length > 0 ? (
              savedCards.map((card, index) => (
                <button type="button" key={index} className="yellow-btn" onClick= {() => handleUseSavedCard(card)} >
                    {`${card.cardType} ****${card.cardNumber.slice(-4)}`}
                </button>
              ))
            ) : (
              <button type="button" className= "yellow-btn">No saved cards</button> 
            )}
          </div>
        </div>

        <div className="checkout-section">
          <label>Card Type *</label>
          <input type="text" name="cardType" value={payment.cardType} onChange={handleChange} required />
        </div>

        <div className="checkout-section">
          <label>Card Number *</label>
          <input type="text" name="cardNumber" value={payment.cardNumber} onChange={handleChange} required />
        </div>

        <div className="checkout-section">
          <label>Expiry Date *</label>
          <input type="month" className="input" name="expiry" value={payment.expiry} onChange={handleChange} required />
        </div>

        <div className="address-row">
          <div className="address-section">
            <label>Billing Street *</label>
            <input type="text" name="billingStreet" value={payment.billingStreet} onChange={handleChange} required />
          </div>

          <div className="address-section">
            <label>Billing City *</label>
            <input type="text" name="billingCity" value={payment.billingCity} onChange={handleChange} required />
          </div>
        </div>

        <div className = "address-row">
          <div className="address-section">
            <label>Billing State *</label>
            <input type="text" name="billingState" value={payment.billingState} onChange={handleChange} required />
          </div>

          <div className="address-section">
            <label>Billing Zip *</label>
            <input type="text" name="billingZip" value={payment.billingZip} onChange={handleChange} required/>
          </div>
        </div>

        <div className="checkout-section promo-section">
          <label>Promo Code:</label>
          <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
          <button type="button" className="yellow-btn" onClick={handlePromoApply}>Apply</button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <h3 className="checkout-total">
          Total: ${parseInt(discount) > 0 ? `${discountedTotal} (Saved ${parseInt(discount)}%)` : total}
        </h3>

        <div className="checkout-actions">
          <button className="green-btn">Confirm</button>
          <button type="button" className="gray-btn" onClick={() => window.location.href = '/'}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;