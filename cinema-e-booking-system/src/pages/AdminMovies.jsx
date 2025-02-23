import React, { useState } from "react";
import "./AdminMovies.css";

const AdminMovies = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", genre: "Sci-Fi", status: "Now Showing" },
    { id: 2, title: "Interstellar", genre: "Adventure", status: "Coming Soon" },
  ]);

  const [newMovie, setNewMovie] = useState({ title: "", genre: "", status: "Now Showing" });

  // Handles input field changes
  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  // Add a new movie
  const handleAddMovie = () => {
    if (!newMovie.title || !newMovie.genre) return; // Prevent empty submissions

    setMovies([...movies, { id: movies.length + 1, ...newMovie }]);
    setNewMovie({ title: "", genre: "", status: "Now Showing" }); // Reset form
  };

  // Delete a movie
  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage Movies</h2>
      <div className="admin-table">
        <div className="table-header">
          <span>Title</span>
          <span>Genre</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {movies.map((movie) => (
          <div key={movie.id} className="table-row">
            <span>{movie.title}</span>
            <span>{movie.genre}</span>
            <span className={movie.status === "Now Showing" ? "active" : "upcoming"}>
              {movie.status}
            </span>
            <button className="delete-button" onClick={() => handleDeleteMovie(movie.id)}>❌ Delete</button>
          </div>
        ))}
      </div>

      {/* Add Movie Section */}
      <div className="add-movie-form">
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={newMovie.title}
          onChange={handleChange}
          className="movie-input"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={handleChange}
          className="movie-input"
        />
        <select name="status" value={newMovie.status} onChange={handleChange} className="movie-select">
          <option value="Now Showing">Now Showing</option>
          <option value="Coming Soon">Coming Soon</option>
        </select>
        <button className="add-movie" onClick={handleAddMovie}>➕ Add Movie</button>
      </div>
    </div>
  );
};

export default AdminMovies;

