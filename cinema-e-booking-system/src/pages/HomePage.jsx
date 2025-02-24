// import React from "react";
// import Navbar from "../components/Navbar";
// import MovieList from "../components/MovieList";
// import "../pages/HomePage.css"; // Import the CSS file

// const sampleMovies1 = [
//   { 
//       title: "Inception", 
//       poster: "https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg", 
//       trailer: "https://www.youtube.com/embed/8hP9D6kZseM" 
//   },
//   { 
//       title: "Interstellar", 
//       poster: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg", 
//       trailer: "https://www.youtube.com/embed/zSWdZVtXT7E" 
//   },
//   { 
//       title: "The Matrix", 
//       poster: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg",
//       trailer: "https://www.youtube.com/embed/vKQi3bBA1y8" 
//   },
//   { 
//     title: "The Shawshank Redemption", 
//     poster: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg",
//     trailer: "https://www.youtube.com/embed/PLl99DlL6b4" 
//   }, 
//   { 
//     title: "The Dark Knight", 
//     poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
//     trailer: "https://www.youtube.com/embed/EXeTwQWrcwY" 
//   },
//   { 
//     title: "Fight Club", 
//     poster: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg",
//     trailer: "https://www.youtube.com/embed/BdJKm16Co6M" 
//   },
//   { 
//     title: "Back to the Future", 
//     poster: "https://m.media-amazon.com/images/M/MV5BZmM3ZjE0NzctNjBiOC00MDZmLTgzMTUtNGVlOWFlOTNiZDJiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
//     trailer: "https://www.youtube.com/embed/qvsgGtivCgs" 
//   }      
// ];

// const sampleMovies2 = [
//   { 
//       title: "The Gorge", 
//       poster: "https://images.justwatch.com/poster/322729101/s332/the-gorge", 
//       trailer: "https://www.youtube.com/embed/rUSdnuOLebE" 
//   },
//   { 
//       title: "Thunderbolts*", 
//       poster: "https://upload.wikimedia.org/wikipedia/en/9/90/Thunderbolts%2A_poster.jpg", 
//       trailer: "https://www.youtube.com/embed/v-94Snw-H4o" 
//   },
//   { 
//       title: "Companion", 
//       poster: "https://upload.wikimedia.org/wikipedia/en/4/48/Companion_film_poster.jpg",
//       trailer: "https://www.youtube.com/embed/Qr_kX0D3DNA" 
//   } 
// ];

// const HomePage = () => {
//   return (
//     <div className="homepage">
//       <Navbar />
//       <div className="homepage-content">
//         <MovieList title="🎬 Currently Running Movies" movies={sampleMovies1} />
//         <MovieList title="🍿 Coming Soon!" allowToBook={false} movies={sampleMovies2} />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

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
//       const res = await axios.get("http://localhost:5000/movies");
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
//         <MovieList title="🎬 Currently Running Movies" movies={currentlyRunning} />
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

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/movies"); // Fetch movies from backend
      console.log("Movies fetched:", res.data); // ✅ Debugging
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Separate movies by category
  const currentlyRunning = movies.filter(movie => movie.category === "Currently Running");
  const comingSoon = movies.filter(movie => movie.category === "Coming Soon");

  return (
    <div className="homepage">
      <Navbar />
      <div className="homepage-content">
        <MovieList title="🎬 Currently Running Movies" allowToBook={true} movies={currentlyRunning} />
        <MovieList title="🍿 Coming Soon!" allowToBook={false} movies={comingSoon} />
      </div>
    </div>
  );
};

export default HomePage;

