import React, { useState, useEffect } from "react";
import "./AdminScheduleMovies.css";
import { useNavigate } from "react-router-dom";
import ScreeningRequests from "../facade/ScreeningRequests"

const AdminScheduleMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchScheduledMovies();
  }, []);

  const fetchScheduledMovies = async () => {
    const res = await ScreeningRequests.getAllScreenings();
    if (res) {
      setMovies(res);
    }  
  };

  const handleDeleteScheduledMovie = async (id) => {
    const res = ScreeningRequests.deleteScreening(id);
    if (res) {
      setMovies(movies.filter((movie) => movie.id !== id));
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