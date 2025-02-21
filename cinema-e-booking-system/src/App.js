import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Updated import path

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route for Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Additional Routes (if needed) */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
