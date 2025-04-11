import React, { useState } from "react";
import "./AdminPromotions.css";

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState([]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleAddPromotion = async () => {
    if (!promoCode.trim() || !discount.trim() || !expirationDate.trim()) return;

    const newPromo = {
      promoCode,
      discount,
      expirationDate,
    };

    try {
      const response = await fetch("http://localhost:5000/addPromotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPromo),
      });

      const data = await response.json();
      console.log(data.message); // Confirm success

      setPromotions([...promotions, newPromo]);

      // Clear inputs
      setPromoCode("");
      setDiscount("");
      setExpirationDate("");
    } catch (error) {
      console.error("Error adding promotion:", error);
    }
  };

  const handleDelete = (index) => {
    const updatedPromos = [...promotions];
    updatedPromos.splice(index, 1);
    setPromotions(updatedPromos);
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage Promotions</h2>

      {/* Table Displaying Promotions */}
      <div className="admin-table">
        <div className="table-header">
          <span>Promo Code</span>
          <span>Discount</span>
          <span>Expires On</span>
          <span>Actions</span>
        </div>
        {promotions.map((promo, index) => (
          <div key={index} className="table-row">
            <span>{promo.promoCode}</span>
            <span>{promo.discount}</span>
            <span>{promo.expirationDate}</span>
            <button className="delete-button" onClick={() => handleDelete(index)}>❌ Delete</button>
          </div>
        ))}
      </div>

      {/* Add Promotion Form */}
      <div className="add-promo-form">
        <input
          type="text"
          placeholder="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="promo-input"
        />
        <input
          type="text"
          placeholder="Discount (e.g. 20% Off)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="promo-input"
        />
        <input
          type="date"
          placeholder="Expiration Date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="promo-input"
        />
        <button className="add-promo" onClick={handleAddPromotion}>➕ Add Promotion</button>
      </div>
    </div>
  );
};

export default AdminPromotions;