import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-title">Admin Dashboard</h2>
      <div className="admin-options">
        <button className="admin-button" onClick={() => navigate("/admin-movies")}>
          🎬 Manage Movies
        </button>
        <button className="admin-button" onClick={() => navigate("/admin-users")}>
          👤 Manage Users
        </button>
        <button className="admin-button" onClick={() => navigate("/admin-promotions")}>
          🎟️ Manage Promotions
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
