// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../components/Navbar.css"; // Import the CSS file

// export default function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo / Title */}
//         <div className="navbar-logo">
//           <a href="/">🎬 Cinema Booking</a>
//         </div>

//         {/* Search Bar */}
//         <div className="navbar-search">
//           <input
//             type="text"
//             placeholder="🔍 Search Movies..."
//             value={searchQuery}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="navbar-buttons">
//           <button className="navbar-btn" onClick={() => navigate("/register")}>
//             Sign Up
//           </button>
//           <button className="navbar-btn" onClick={() => navigate("/login")}>
//             Log In
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Navbar.css"; // Import the CSS file

export default function Navbar({ movies, setFilteredMovies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      // If search is empty, reset to all movies
      setFilteredMovies(movies);
      return;
    }

    // Filter movies based on title
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );

    setFilteredMovies(filtered);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Title */}
        <div className="navbar-logo">
          <a href="/">🎬 Cinema Booking</a>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="🔍 Search Movies..."
            value={searchQuery}
            onChange={handleChange}
          />
        </div>

        {/* Buttons */}
        <div className="navbar-buttons">
          <button className="navbar-btn" onClick={() => navigate("/register")}>
            Sign Up
          </button>
          <button className="navbar-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
}
