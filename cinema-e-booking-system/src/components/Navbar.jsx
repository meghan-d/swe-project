// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "../components/Navbar.css"; // Import the CSS file

// export default function Navbar({ movies, setFilteredMovies }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = localStorage.getItem("email");  // Check localStorage for the user info
//     setIsLoggedIn(!!user);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("email");  // Remove email from localStorage
//     setIsLoggedIn(false);
//     toast.success("Logout Successful!");
//     navigate("/");
//   };

//   const handleChange = (e) => {
//     const query = e.target.value.toLowerCase().trim();
//     setSearchQuery(query);

//     setFilteredMovies(
//       query
//         ? movies.filter((movie) => movie.title.toLowerCase().includes(query))
//         : movies
//     );
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo / Title */}
//         <div className="navbar-logo">
//           <Link to="/">🎬 Cinema Booking</Link>
//         </div>

//         {/* Book Movie Button */}
//         <button className="book-button" onClick={() => navigate("/select-movie")}>
//           Book a Movie
//         </button>

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
//           {isLoggedIn ? (
//             <>
//               <button className="navbar-btn" onClick={() => navigate("/edit-profile")}>
//                 Edit Profile
//               </button>
//               <button className="navbar-btn logout" onClick={handleLogout}>
//                 Log Out
//               </button>
//             </>
//           ) : (
//             <>
//               <button className="navbar-btn" onClick={() => navigate("/register")}>
//                 Sign Up
//               </button>
//               <button className="navbar-btn" onClick={() => navigate("/login")}>
//                 Log In
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         theme="dark"
//         closeOnClick
//         pauseOnHover
//         draggable
//         pauseOnFocusLoss
//       />
//     </nav>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/Navbar.css"; // Import the CSS file

export default function Navbar({ movies, setFilteredMovies }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    toast.success("Logout Successful!");
    navigate("/");
  };

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);

    setFilteredMovies(
      query
        ? movies.filter((movie) => movie.title.toLowerCase().includes(query))
        : movies
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Title */}
        <div className="navbar-logo">
          <Link to="/">🎬 Cinema Booking</Link>
        </div>

        {/* Book Movie Button */}
        <button className="book-button" onClick={() => navigate("/select-movie")}>
          Book a Movie
        </button>

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
          {isLoggedIn ? (
            <>
              <button className="navbar-btn" onClick={() => {
                  const user = JSON.parse(sessionStorage.getItem('user'));
                  if (user && user.id) {
                    navigate(`/edit-profile?userId=${user.id}`);
                  } else {
                    toast.error("You need to be logged in to edit your profile.");
                  }
              }}
            >
              Edit Profile
            </button>
              <button className="navbar-btn logout" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="navbar-btn" onClick={() => navigate("/register")}>
                Sign Up
              </button>
              <button className="navbar-btn" onClick={() => navigate("/login")}>
                Log In
              </button>
            </>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </nav>
  );
}