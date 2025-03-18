import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  });
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
    if (!formData.phone) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveUserToAdmin = async (newUser) => {
    //const existingUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
    //localStorage.setItem("adminUsers", JSON.stringify([...existingUsers, newUser]));
    try {
      await axios.post("http://localhost:5000/registeredusers", newUser) // Send a POST request to your backend
    } catch(error) {
      console.error("Error saving user:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    const newUser = { name: formData.name, email: formData.email, password: formData.password,
      phone: formData.phone, cardType: formData.cardType, cardNumber: formData.cardNumber,
      expirationDate: formData.expirationDate, billingStreet: formData.billingStreet, billingCity: formData.billingCity,
      billingState: formData.billingState, billingZip: formData.billingZip, addressStreet: formData.street,
      addressCity: formData.city, addressState: formData.state, addressZip: formData.zip };
    
    saveUserToAdmin(newUser); // Save user to admin
    setIsSubmitting(true);
    setTimeout(() => {
        navigate("/registration-confirm");
    }, 2000);
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">🎟️ VIP Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
      <h3 className="section-title">Personal Information</h3>
        <div className="form-group">
          <label className="label">Full Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="input"/>
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="label">Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input"/>
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="label">Password *</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="input"/>
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label className="label">Phone Number *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input"/>
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <h3 className="section-title">Payment Information and Billing Address (Optional)</h3>
        <div className="form-group">
          <label className="label">Card Number</label>
          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="input"/>
        </div>
        <div className="two-column">
        <div className="form-group">
          <label className="label">Card Type</label>
          <input type="text" name="cardType" value={formData.cardType} onChange={handleChange} className="input"/>
        </div>
        <div className="form-group">
          <label className="label">Expiration Date</label>
          <input type="month" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="input"/>
        </div>
        </div>

        <div className="two-column">
        <div className="form-group">
          <label className="label">Street Address</label>
          <input type="text" name="billingStreet" value={formData.billingStreet} onChange={handleChange} className="input"/>
        </div>
        <div className="form-group">
          <label className="label">City</label>
          <input type="text" name="billingCity" value={formData.billingCity} onChange={handleChange} className="input"/>
        </div>
        </div>
        <div className="two-column">
        <div className="form-group">
          <label className="label">State</label>
          <input type="text" name="billingState" value={formData.billingState} onChange={handleChange} className="input"/>
        </div>
        <div className="form-group">
          <label className="label">Zip Code</label>
          <input type="text" name="billingZip" value={formData.billingZip} onChange={handleChange} className="input"/>
        </div>
        <button className="payment-button">Add Another Card</button>
        </div>

        <h3 className="section-title">Home Address (Optional)</h3>
        <div className="two-column">
          <div className="form-group">
            <label className="label">Street Address</label>
            <input type="text" name="street" value={formData.street} onChange={handleChange} className="input" />
          </div>
          <div className="form-group">
            <label className="label">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="input" />
          </div>
        </div>
        <div className="two-column">
        <div className="form-group">
          <label className="label">State</label>
          <input type="text" name="state" value={formData.billingState} onChange={handleChange} className="input"/>
        </div>
        <div className="form-group">
          <label className="label">Zip Code</label>
          <input type="text" name="zip" value={formData.billingZip} onChange={handleChange} className="input"/>
        </div>
        </div>
        <div className = "checkbox">
          <input type="checkbox" id="promotions" name="promotions" unchecked />
          <label for="promotions"> Click here to register for promotional emails.</label>
        </div>
        <button type="submit" className="button button-save" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Join Now"}
        </button>
      </form>
    </div>
  );
};

export default Registration;

