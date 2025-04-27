import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import BookingRequests from '../facade/BookingRequests';

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDetails = localStorage.getItem("bookingInfo");
    if (storedDetails) {
      const parsedDetails = JSON.parse(storedDetails);
      console.log(parsedDetails)
      setOrderDetails(parsedDetails);

      // Send email when orderDetails loaded
      sendConfirmationEmail(parsedDetails);
    }
  }, []);

  const sendConfirmationEmail = async (details) => {
    const user = sessionStorage.getItem("user");
    const parsedUser = JSON.parse(user);

    const res = BookingRequests.sendBookingConfirmation(details, parsedUser.email);
    if (res) {
      console.log("Confirmation Email Sent!");
    }
  };

  if (!orderDetails) {
    return <div className="p-6 text-center">Loading confirmation...</div>;
  }

  const seatLabels = orderDetails.seats.map(seat => seat.seatLabel).join(", ");
  return (
    <div className="order-confirmation-container">
      <h1>🎉 Your Order is Confirmed! 🎉</h1>

      <p className="thank-you-message">Thank you for your purchase! We hope you enjoy your movie experience. 🍿</p>

      <div className="order-details">
        <h2>Order Details</h2>
        <table>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Showtime</th>
              <th>Seats</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orderDetails.movieTitle}</td>
              <td>{orderDetails.time}</td>
              <td>{seatLabels}</td>
              <td>${orderDetails.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="enjoy-message">🎬 Sit back, relax, and enjoy the show! 🎬</p>
      <button className="button" onClick={() => navigate("/")}>Go to Homepage</button>  {/* Button to go back to homepage */}

      <style jsx>{`
        .order-confirmation-container {
          text-align: center;
          padding: 30px;
          background: #f4f4f9;
          min-height: 100vh;
          font-family: Arial, sans-serif;
        }
        h1 {
          color: #28a745;
          font-size: 28px;
          margin-bottom: 20px;
        }
        .thank-you-message {
          font-size: 18px;
          color: #333;
          margin-bottom: 20px;
        }
        .order-details {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: center;
        }
        th {
          background-color: #007bff;
          color: white;
        }
        .enjoy-message {
          font-size: 20px;
          color: #333;
          margin-top: 20px;
          font-weight: bold;
        }
        .button {
          background-color: #007bff;
          padding: '10px 20px';
          fontSize: '16px';
          color: 'white';
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;