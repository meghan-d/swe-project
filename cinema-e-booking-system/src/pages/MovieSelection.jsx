import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const MovieSelection = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies"); // Fetch movies from backend
      setFilteredMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const currentlyRunning = filteredMovies.filter(
    (movie) => movie.category === "Currently Running"
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Select a Movie</h2>
      <div className="grid grid-cols-2 gap-4">
        {currentlyRunning.map((movie) => (
          <div key={movie.id} className="border p-4 rounded shadow">
            <h3 className="text-lg">{movie.title}</h3>
            <p className="text-sm text-gray-500">{movie.category}</p>

            <button
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded mr-2"
              onClick={() => window.location.href = `/select-showtime/${movie.id}`}
            >
              Book Movie
            </button>

            <Link to={`/movie-details/${movie.id}`}>
              <button className="bg-gray-500 text-white px-3 py-1 mt-2 rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSelection;