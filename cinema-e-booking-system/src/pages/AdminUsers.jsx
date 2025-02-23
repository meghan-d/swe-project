import React from 'react';

const AdminUsers = () => {
  return (
    <div className="admin-page">
      <h1>Manage Users</h1>
      <button className="add-btn">Add New User</button>
      
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>JohnDoe</td>
            <td>johndoe@example.com</td>
            <td>Admin</td>
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

export default AdminUsers;
