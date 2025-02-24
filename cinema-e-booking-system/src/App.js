import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Keep HomePage
import LoginPage from './pages/LoginPage';  // Keep LoginPage
import OrderConfirmation from './pages/OrderConfirmation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Home Page as the default page */}
        <Route path="/login" element={<LoginPage />} />  {/* Login Page Route */}
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
};

export default App;
