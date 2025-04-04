import React, { useState, useEffect } from "react";
import "./AdminScheduleMovies.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminScheduleMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  // Handles input field changes
  /*const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };
  */

  useEffect(() => {
    fetchScheduledMovies();
  }, []);

  const fetchScheduledMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/screenings"); // Fetch movies from backend
      console.log(res.data);
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDeleteScheduledMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/screenings/${id}`)
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.log("Problem deleting movie:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="title-container">
        <h2 className="admin-title">Scheduled Movies</h2>
        <button onClick={() => navigate("/admin-dashboard")} className="back-button">← Back</button>
      </div>
      <div className="admin-table">
        <div className="table-header">
          <span>Title</span>
          <span>Showroom</span>
          <span>Date</span>
          <span>Time</span>
          <span>Actions</span>
        </div>
        {movies.map((movie) => (
          <div key={movie.showID} className="table-row">
            <span>{movie.movie}</span>
            <span>{movie.auditorium}</span>
            <span>{new Date(movie.date).toLocaleDateString()}</span>
            <span>{movie.showtime} </span>
            <button className="delete-button" onClick={() => handleDeleteScheduledMovie(movie.showID)}>❌ Delete</button>
          </div>
        ))}
      </div>
        <button className="add-movie" onClick={() => navigate("/schedule-movie")}>➕ Schedule Movie</button>
      </div>
  );
};

export default AdminScheduleMovies;

