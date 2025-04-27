import React, { useState, useEffect } from "react";
import "./OrderHistory.css";
import { useNavigate, useParams } from "react-router-dom";
import BookingRequests from "../facade/BookingRequests";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await BookingRequests.getBookingHistory(id);
      if (res) {
        setOrders(res);
      }
    };
    fetchOrders();
  }, [id]);

  return (
    <div className="order-history-container">
      <h2 className="history-title">Order History</h2>
      <button onClick={() => navigate("/")} className="back-button">← Back</button>
      <div className="history-table">
        <div className="table-header">
          <span>Movie</span>
          <span>Movie Date</span>
          <span>Movie Time</span>
          <span>Order Total</span>
        </div>

        {orders.map((order, index) => (
          <div key={index} className="table-row">
            <span>{order.movie}</span>
            <span>{new Date(order.bookingDate).toLocaleDateString()}</span>
            <span>{order.timestamp}</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
