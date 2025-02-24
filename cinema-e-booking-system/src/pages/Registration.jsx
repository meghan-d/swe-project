import React, { useState } from "react";    
import "./Registration.css";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveUserToAdmin = (newUser) => {
    const existingUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
    localStorage.setItem("adminUsers", JSON.stringify([...existingUsers, newUser]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const newUser = { name: formData.name, email: formData.email, role: "User" };
    saveUserToAdmin(newUser); // Save user to admin list

    setIsSubmitting(true);
    setTimeout(() => {
        navigate("/registration-confirm");
    }, 2000);
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">🎟️ VIP Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label className="label">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="input"/>
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="label">Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input"/>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="label">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="input"/>
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <button type="submit" className="button button-save" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Join Now"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
