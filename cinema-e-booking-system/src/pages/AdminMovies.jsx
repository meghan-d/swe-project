import React, { useState, useEffect } from "react";
import "./AdminMovies.css";
import { useNavigate } from "react-router-dom";
import MovieRequests from "../facade/MovieRequests";
import MovieAdapter from "../adapters/MovieAdapter"; 

const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await MovieRequests.getAllMovies();
    if (res) {
      const adaptedMovies = MovieAdapter.adaptList(res); 
      setMovies(adaptedMovies);
    }
  };

  const handleDeleteMovie = async (id) => {
    const res = await MovieRequests.deleteMovie(id);
    if (res) {
      setMovies(movies.filter((movie) => movie.movieId !== id)); 
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
          <div key={movie.movieId} className="table-row">
            <span>{movie.title}</span>
            <span>{movie.genre}</span>
            <span className={movie.category === "Currently Running" ? "active" : "upcoming"}>
              {movie.category}
            </span>
            <button className="delete-button" onClick={() => handleDeleteMovie(movie.movieId)}>❌ Delete</button>
          </div>
        ))}
      </div>
      <button className="add-movie" onClick={() => navigate("/add-movie")}>➕ Add Movie</button>
    </div>
  );
};

export default AdminMovies;
