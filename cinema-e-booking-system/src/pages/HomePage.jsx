// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import MovieList from "../components/MovieList";
// import "../pages/HomePage.css";

// const HomePage = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/movies"); // Fetch movies from backend
//       console.log("Movies fetched:", res.data); // ✅ Debugging
//       setMovies(res.data);
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   // Separate movies by category
//   const currentlyRunning = movies.filter(movie => movie.category === "Currently Running");
//   const comingSoon = movies.filter(movie => movie.category === "Coming Soon");

//   return (
//     <div className="homepage">
//       <Navbar />
//       <div className="homepage-content">
//         <MovieList title="🎬 Currently Running Movies" allowToBook={true} movies={currentlyRunning} />
//         <MovieList title="🍿 Coming Soon!" allowToBook={false} movies={comingSoon} />
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import MovieList from "../components/MovieList";
import "../pages/HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies"); // Fetch movies from backend
      setMovies(res.data);
      setFilteredMovies(res.data); // Initially, show all movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

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
      </div>
    </div>
  );
};

export default HomePage;
