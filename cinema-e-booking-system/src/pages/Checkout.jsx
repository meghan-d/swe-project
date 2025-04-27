import React, { useState, useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import "./Checkout.css";
import ProfileRequests from "../facade/ProfileRequests";
import PromotionRequests from "../facade/PromotionsRequests";
import BookingRequests from "../facade/BookingRequests";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const { bookingData } = useBooking();
  const navigate = useNavigate();

  const [payment, setPayment] = useState({ cardNumber: "", expiry: "" });
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [savedCards, setSavedCards] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId");
    const formattedDate = new Date(bookingData.selectedDate).toISOString().split('T')[0];
  
    try {
      const res = await BookingRequests.saveBooking({
        userID: userId,
        bookingDate: formattedDate,
        showtimeID: bookingData.showtimeID,
        noOfTickets: bookingData.seats.length,
        //totalPrice: bookingData.ticketPrice * bookingData.seats.length,
        totalPrice: discountedTotal
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
    setPayment({ ...payment, [e.target.name]: e.target.value });
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
  };

  const baseTotal =
    bookingData?.seats?.reduce((sum, seat) => sum + seat.getPrice(), 0) || 0;

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
          <input type="text" name="cardType" value={payment.cardType || ""} onChange={handleChange} required />
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
