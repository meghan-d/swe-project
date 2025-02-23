import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Sample data for charts
  const ticketSalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Tickets Sold',
        data: [120, 200, 150, 300, 250, 400],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <button onClick={() => navigate('/manage-movies')}>Manage Movies</button>
        <button onClick={() => navigate('/manage-users')}>Manage Users</button>
        <button onClick={() => navigate('/manage-promotions')}>Manage Promotions</button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h1>Welcome, Admin</h1>
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
          <h2>Ticket Sales Overview</h2>
          <Bar data={ticketSalesData} />
        </div>

        {/* Recent Bookings Table */}
        <div className="table-container">
          <h2>Recent Bookings</h2>
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
                <td>Confirmed</td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>The Matrix</td>
                <td>Jane Smith</td>
                <td>2025-02-21</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Styling */}
      <style jsx>{`
        .admin-dashboard {
          display: flex;
          height: 100vh;
        }

        .sidebar {
          width: 250px;
          background-color: #222;
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .sidebar h2 {
          font-size: 22px;
          margin-bottom: 20px;
        }

        .sidebar button {
          background: #444;
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .sidebar button:hover {
          background: #666;
        }

        .dashboard-content {
          flex: 1;
          padding: 30px;
          background: #f5f5f5;
        }

        .stats-container {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .stat-box {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          flex: 1;
          text-align: center;
        }

        .chart-container {
          margin-top: 30px;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .table-container {
          margin-top: 30px;
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        th {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
