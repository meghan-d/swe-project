import React, { useState, useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import "./Checkout.css";
import ProfileRequests from "../facade/ProfileRequests";
import PromotionRequests from "../facade/PromotionsRequests";
import BookingRequests from "../facade/BookingRequests";
import { useNavigate } from "react-router-dom";



const Checkout = () => {
  const navigate = useNavigate();

  const [payment, setPayment] = useState({ cardNumber: "", expiry: "" });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [savedCards, setSavedCards] = useState([]);
  const { bookingData, setBookingData } = useBooking();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{16}$/.test(payment.cardNumber)) {
      setError("Card number must be exactly 16 digits.");
      return;
    }
    
    if (!payment.cardType) {
      setError("Please select a Card Type.");
      return;
    }
    
  
    const userId = localStorage.getItem("userId");
    const formattedDate = new Date(bookingData.selectedDate).toISOString().split('T')[0];
  
    try {
      const res = await BookingRequests.saveBooking({
        userID: userId,
        bookingDate: formattedDate,
        showtimeID: bookingData.showtimeID,
        noOfTickets: bookingData.seats.length,
        totalPrice: discountedTotal,
        cardType: bookingData.cardType,
        cardNumber: bookingData.cardNumber
      });
      
  
      if (res.message === "Booking saved successfully!") {
        const bookingInfo = {
            movieTitle: bookingData.movieTitle, 
            time: bookingData.showtimeTime,            
            totalPrice: discountedTotal,
            seats: bookingData.seats.map(seat => ({
              seatLabel: seat.seatLabel
        }))}
        localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
        navigate("/order-confirmation");
      } else {
        setError("Failed to save booking. Please try again.");
      }
    } catch (err) {
      console.error("Error during booking submission:", err);
      setError("Booking failed. Please try again.");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      ProfileRequests.getUserProfile(userId)
      .then((res) => {
        const card = res.paymentCards || [];
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
    const { name, value } = e.target;
    
    setPayment((prev) => ({
      ...prev,
      [name]: value
    }));
  
    if (name === "cardType" || name === "cardNumber") {
      setBookingData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePromoApply = async () => {
    try {
      const res = await PromotionRequests.applyPromotion(promoCode);
      setDiscount(res.discount);
      setError("");
    } catch (err) {
      setDiscount(0);
      setError("Invalid or expired promo code.");
    }
  };

  const handleUseSavedCard = (card) => {
    const formattedExpiry = card.expirationDate?.slice(0, 7);
    setPayment({
      cardType: card.cardType,
      cardNumber: card.cardNumber,
      expiry: formattedExpiry,
      billingStreet: card.billingStreet,
      billingCity: card.billingCity,
      billingState: card.billingState,
      billingZip: card.billingZip,
    });

    setBookingData((prev) => ({
      ...prev,
      cardType: card.cardType,
      cardNumber: card.cardNumber
    }));
  };

  const baseTotal1 =
    bookingData?.seats?.reduce((sum, seat) => sum + seat.getPrice(), 0) || 0;

  const baseTotal = ((baseTotal1 + (3.50) + baseTotal1*0.07));

  const discountedTotal = (baseTotal - baseTotal * (parseInt(discount) / 100)).toFixed(2);

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>

        <div className="checkout-section">
          <label>Use Saved Card:</label>
          <div className="savedcard-buttons">
            {savedCards.length > 0 ? (
              savedCards.map((card, index) => (
                <button
                  type="button"
                  key={index}
                  className="yellow-btn"
                  onClick={() => handleUseSavedCard(card)}
                >
                  {`${card.cardType} ****${card.cardNumber.slice(-4)}`}
                </button>
              ))
            ) : (
              <button type="button" className="yellow-btn">
                No saved cards
              </button>
            )}
          </div>
        </div>

        <div className="checkout-section">
          <label>Card Type *</label>
          <select name="cardType" value={payment.cardType || ""} onChange={handleChange} className="input" required>
            <option value="">Select Card Type</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
            <option value="Discover">Discover</option>
            <option value="American Express">American Express</option>
          </select>
        </div>

        <div className="checkout-section">
          <label>Card Number *</label>
          <input type="text" name="cardNumber" value={payment.cardNumber || ""} onChange={handleChange} required />
        </div>

        <div className="checkout-section">
          <label>Expiry Date *</label>
          <input
            type="month"
            className="input"
            name="expiry"
            value={payment.expiry || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="address-row">
          <div className="address-section">
            <label>Billing Street *</label>
            <input
              type="text"
              name="billingStreet"
              value={payment.billingStreet || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="address-section">
            <label>Billing City *</label>
            <input
              type="text"
              name="billingCity"
              value={payment.billingCity || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="address-row">
          <div className="address-section">
            <label>Billing State *</label>
            <input
              type="text"
              name="billingState"
              value={payment.billingState || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="address-section">
            <label>Billing Zip *</label>
            <input
              type="text"
              name="billingZip"
              value={payment.billingZip || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="checkout-section promo-section">
          <label>Promo Code:</label>
          <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
          <button type="button" className="yellow-btn" onClick={handlePromoApply}>
            Apply
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <h3 className="checkout-total">
          Total: $
          {parseInt(discount) > 0
            ? `${discountedTotal} (Saved ${parseInt(discount)}%)`
            : baseTotal.toFixed(2)}
        </h3>

        <div className="checkout-actions">
          <button className="green-btn">Confirm</button>
          <button type="button" className="gray-btn" onClick={() => (window.location.href = "/")}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
