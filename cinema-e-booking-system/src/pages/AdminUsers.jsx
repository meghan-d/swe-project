import React, { useState, useEffect } from "react";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
    setUsers(savedUsers);
  }, []);

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((_, index) => index !== id);
    setUsers(updatedUsers);
    localStorage.setItem("adminUsers", JSON.stringify(updatedUsers));
  };

  return (
    <div className="admin-users-container">
      <h2 className="admin-title">Manage Users</h2>
      <div className="admin-table">
        <div className="table-header">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Actions</span>
        </div>
        {users.map((user, index) => (
          <div key={index} className="table-row">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role}</span>
            <button className="delete-button" onClick={() => handleDeleteUser(index)}>❌ Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
