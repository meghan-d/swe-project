import React from 'react';

const OrderConfirmation = () => {
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
              <td>Inception</td>
              <td>7:00 PM</td>
              <td>A3, A4</td>
              <td>$20</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p className="enjoy-message">🎬 Sit back, relax, and enjoy the show! 🎬</p>
      
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
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
