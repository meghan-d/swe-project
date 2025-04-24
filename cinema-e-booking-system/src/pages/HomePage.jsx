import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import "../pages/HomePage.css";
import MovieRequests from "../facade/MovieRequests";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await MovieRequests.getAllMovies();
    if (res) {
      setMovies(res);
      setFilteredMovies(res);
    }
  }

  // Separate movies by category
  const currentlyRunning = filteredMovies.filter(
    (movie) => movie.category === "Currently Running"
  );
  const comingSoon = filteredMovies.filter(
    (movie) => movie.category === "Coming Soon"
  );

  return (
    <div className="homepage">
      <Navbar movies={movies} setFilteredMovies={setFilteredMovies} />
      <div className="homepage-content">
        {/* Show "No Movies Found" only if both lists are empty */}
        {currentlyRunning.length === 0 && comingSoon.length === 0 ? (
          <p className="no-movies-message"> No movies found. Please try a different search.</p>
        ) : (
          <>
        {/* Show only relevant sections based on search results */}
        {currentlyRunning.length > 0 && (
          <MovieList
            title="🎬 Currently Running Movies"
            allowToBook={true}
            movies={currentlyRunning}
          />
        )}
        {comingSoon.length > 0 && (
          <MovieList
            title="🍿 Coming Soon!"
            allowToBook={false}
            movies={comingSoon}
          />
        )}
        </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
