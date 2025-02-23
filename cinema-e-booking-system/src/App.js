import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfileEdit from './pages/ProfileEdit';
import MovieSelection from './pages/MovieSelection';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';
import OrderSummary from './components/OrderSummary';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/AdminDashboard';
import AdminMovies from './pages/AdminMovies';
import Registration from "./pages/Registration";
import RegistrationConfirm from "./pages/RegistrationConfirm";
import AdminPromotions from './pages/AdminPromotions';
import AdminUsers from './pages/AdminUsers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  
        <Route path="/login" element={<LoginPage />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
        <Route path="/select-movie" element={<MovieSelection />} />
        <Route path="/select-seats" element={<SeatSelection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/admin-users" element={<AdminUsers />} />
        <Route path="/registration-confirm" element={<RegistrationConfirm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-movies" element={<AdminMovies />} />
        <Route path="/admin-promotions" element={<AdminPromotions />} />
      </Routes>
    </Router>
  );
};

export default App;

