import React from 'react';

const AdminPromotions = () => {
  return (
    <div className="admin-page">
      <h1>Manage Promotions</h1>
      <button className="add-btn">Create New Promotion</button>
      
      <table>
        <thead>
          <tr>
            <th>Promo Name</th>
            <th>Discount</th>
            <th>Expiration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Summer Special</td>
            <td>20% Off</td>
            <td>July 15, 2025</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminPromotions;
