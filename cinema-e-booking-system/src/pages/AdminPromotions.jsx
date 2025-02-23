import React, { useState } from "react";
import "./AdminPromotions.css";

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState([
    { id: 1, name: "Weekend Special - 20% Off", status: "Active" },
    { id: 2, name: "Student Discount - 10% Off", status: "Expired" },
  ]);

  const [newPromotion, setNewPromotion] = useState("");
  const [status, setStatus] = useState("Active");

  const handleAddPromotion = () => {
    if (newPromotion.trim() === "") return; // Prevent empty promotions

    const newPromo = {
      id: promotions.length + 1,
      name: newPromotion,
      status: status,
    };

    setPromotions([...promotions, newPromo]);
    setNewPromotion(""); // Reset input field
  };

  const handleDelete = (id) => {
    setPromotions(promotions.filter((promo) => promo.id !== id));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage Promotions</h2>

      {/* Table Displaying Promotions */}
      <div className="admin-table">
        <div className="table-header">
          <span>Promotion</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {promotions.map((promo) => (
          <div key={promo.id} className="table-row">
            <span>{promo.name}</span>
            <span className={promo.status === "Active" ? "active" : "expired"}>
              {promo.status}
            </span>
            <button className="delete-button" onClick={() => handleDelete(promo.id)}>❌ Delete</button>
          </div>
        ))}
      </div>

      {/* Add Promotion Form */}
      <div className="add-promo-form">
        <input
          type="text"
          placeholder="New Promotion Name"
          value={newPromotion}
          onChange={(e) => setNewPromotion(e.target.value)}
          className="promo-input"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="promo-select">
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
        </select>
        <button className="add-promo" onClick={handleAddPromotion}>➕Add Promotion</button>
      </div>
    </div>
  );
};

export default AdminPromotions;
