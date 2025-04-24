import React, { useState, useEffect } from "react";
import "./OrderHistory.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
    setOrders(savedUsers);
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get(`http://localhost:5001/bookings/${id}`)
  }

  return (
    <div className="order-history-container">
      <h2 className="history-title">Order History</h2>
      <button onClick={() => navigate("/")} className="back-button">← Back</button>
      <div className="history-table">
        <div className="table-header">
          <span>Movie</span>
          <span>Date</span>
          <span>Time</span>
          <span>Order Total</span>
        </div>
        {orders.map((order, index) => (
          <div key={index} className="table-row">
            <span>{order.name}</span>
            <span>{order.email}</span>
            <span>{order.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
