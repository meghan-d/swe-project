import React, { useEffect, useState } from "react";
import "./AdminPromotions.css";
import PromotionsRequests from "../facade/PromotionsRequests"
import { useNavigate } from "react-router-dom";

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState([]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
      fetchPromotions();
    }, []);

  const handleAddPromotion = async () => {
    //if (!promoCode.trim() || !discount.trim() || !expirationDate.trim()) return;
    if (!promoCode.trim() || !discount.trim() || !expirationDate.trim()) {
      alert("Please fill in all fields!");
      return;
    }
    const newPromo = {promoCode, discount, expirationDate};
  
    const res = await PromotionsRequests.addPromotion(newPromo);
    if (res) {
      setPromotions([...promotions, newPromo]);

      // Clear inputs
      setPromoCode("");
      setDiscount("");
      setExpirationDate("");
    }
  };

  const fetchPromotions = async () => {
      const res = await PromotionsRequests.getAllPromotions();
      if (res) {
        setPromotions(res);
      }
  }
  const handleDelete = (index) => {
    const updatedPromos = [...promotions];
    updatedPromos.splice(index, 1);
    setPromotions(updatedPromos);
  };

  return (
    <div className="admin-container">
      <div className="title-container">
        <h2 className="admin-title">Manage Promotions</h2>
        <button onClick={() => navigate("/admin-dashboard")} className="back-button">← Back</button>
      </div>

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
            <span>{new Date(promo.expirationDate).toLocaleDateString()}</span>
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
          required
        />
        <input
          type="text"
          placeholder="Discount (e.g. 1-100%)"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="promo-input"
          required
        />
        <input
          type="date"
          placeholder="Expiration Date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="promo-input"
          required
        />
        <button className="add-promo" onClick={handleAddPromotion}>➕ Add Promotion</button>
      </div>
    </div>
  );
};

export default AdminPromotions;