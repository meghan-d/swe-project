import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./AdminDashboard.css";
import { ToastContainer, toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Sample data for ticket sales chart
  const ticketSalesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Tickets Sold",
        data: [120, 200, 150, 300, 250, 400],
        backgroundColor: "rgba(255, 215, 0, 0.6)", // Gold bar color
      },
    ],
  };

useEffect(() => {
    const user = sessionStorage.getItem("user");
    //setIsLoggedIn(!!user);
    if (!user) {
      navigate("/login"); // Automatically redirect to login if not logged in
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setIsLoggedIn(false);
    setTimeout(() => {
      navigate("/");
    }, 2000);
    toast.success("Logout Successful! Redirecting to the homepage...")
  };
 
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => navigate("/admin-movies")}>Manage Movies</button>
        <button onClick={() => navigate("/admin-schedule")}>Schedule Movies</button>
        <button onClick={() => navigate("/admin-users")}>Manage Users</button>
        <button onClick={() => navigate("/admin-promotions")}>Manage Promotions</button>
        {isLoggedIn ? (
          <button className = "logoutbutton" onClick={handleLogout}>Logout</button>
        ) : (
          null
        )
        }
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1 className="dashboard-title">Welcome, Admin</h1>

        {/* Statistics */}
        <div className="stats-container">
          <div className="stat-box">
            <h3>Total Movies</h3>
            <p>120</p>
          </div>
          <div className="stat-box">
            <h3>Total Users</h3>
            <p>5,430</p>
          </div>
          <div className="stat-box">
            <h3>Active Promotions</h3>
            <p>8</p>
          </div>
        </div>

        {/* Charts */}
        <div className="chart-container">
          <h2>📊 Ticket Sales Overview</h2>
          <Bar data={ticketSalesData} />
        </div>

        {/* Recent Bookings Table */}
        <div className="table-container">
          <h2>🎟️ Recent Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Movie</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12345</td>
                <td>Inception</td>
                <td>John Doe</td>
                <td>2025-02-22</td>
                <td className="confirmed">Confirmed</td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>The Matrix</td>
                <td>Jane Smith</td>
                <td>2025-02-21</td>
                <td className="pending">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <ToastContainer
              position="top-left"
              autoClose={3000}
              theme="dark"
              closeOnClick
              pauseOnHover
              draggable
              pauseOnFocusLoss
            />
    </div>
  );
};

export default AdminDashboard;
