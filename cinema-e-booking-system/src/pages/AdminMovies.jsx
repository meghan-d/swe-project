import React from 'react';

const AdminMovies = () => {
  return (
    <div className="admin-page">
      <h1>Manage Movies</h1>
      <button className="add-btn">Add New Movie</button>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Showtimes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inception</td>
            <td>Sci-Fi</td>
            <td>8.8</td>
            <td>7:00 PM, 9:30 PM</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <style jsx>{`
        .admin-page { padding: 20px; }
        .add-btn { background: green; color: white; padding: 10px; border: none; cursor: pointer; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .edit-btn { background: orange; color: white; padding: 5px; margin-right: 5px; cursor: pointer; }
        .delete-btn { background: red; color: white; padding: 5px; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default AdminMovies;