import React, { useState, useEffect } from "react";
import "./AdminMovies.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies"); // Fetch movies from backend
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`)
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.log("Problem deleting movie:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="title-container">
        <h2 className="admin-title">Manage Movies</h2>
        <button onClick={() => navigate("/admin-dashboard")} className="back-button">← Back</button>
      </div>
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
              {movie.category}
            </span>
            <button className="delete-button" onClick={() => handleDeleteMovie(movie.id)}>❌ Delete</button>
          </div>
        ))}
      </div>
        <button className="add-movie" onClick={() => navigate("/add-movie")}>➕ Add Movie</button>
      </div>
  );
};

export default AdminMovies;

