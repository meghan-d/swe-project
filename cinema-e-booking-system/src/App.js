import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Keep HomePage
import LoginPage from './pages/LoginPage';  // Keep LoginPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Home Page as the default page */}
        <Route path="/login" element={<LoginPage />} />  {/* Login Page Route */}
      </Routes>
    </Router>
  );
};

export default App;
