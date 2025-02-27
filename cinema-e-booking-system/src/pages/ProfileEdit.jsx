import React, { useState } from "react";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  // State Management
  const [profile, setProfile] = useState({  
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
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Validate Inputs
  {/* const validate = () => {
    const newErrors = {};

    if (!profile.name) newErrors.name = "Name is required";

    if (!profile.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!profile.phone) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  */}

  // Save Profile
  const handleSave = () => {
    //if (!validate()) return;

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Profile saved successfully!");
    }, 2000);
  };

  return (
    <div className="container">
      <h2 className="title">Edit Profile</h2>
      <h3 className="title">Enter any information you want to change.</h3>

      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <h3 className="text-lg text-yellow-400">Personal Information</h3>
      {/* Name Field */}
      <div className="form-group">
        <label className="label">Name</label>
        <input 
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="input"
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      {/* Phone Field */}
      <div className="form-group">
        <label className="label">Phone</label>
        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="input"
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>
      <button className="edit-button">Reset Password</button>

      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Payment Information and Billing Address</h3>
      <div className="two-column">
        <div className="card">Visa 1234</div>
        <button className="delete-button">Remove Card</button>
      </div>
        <div className="form-group">
          <label className="label">Card Number</label>
          <input 
            type="text" 
            name="cardNumber" 
            value={profile.cardNumber} 
            onChange={handleChange} 
            className="input"/>
        </div>
        <div className="two-column">
        <div className="form-group">
          <label className="label">Card Type</label>
          <input 
            type="text" 
            name="cardType" 
            value={profile.cardType} 
            onChange={handleChange} 
            className="input"/>
        </div>
        <div className="form-group">
          <label className="label">Expiration Date</label>
          <input 
            type="month" 
            name="expirationDate" 
            value={profile.expirationDate} 
            onChange={handleChange} 
            className="input"/>
        </div>
        </div>

        <div className="two-column">
      <div className="form-group">
        <label className="label">Address</label>
        <input
          type="text"
          name="address"
          value={profile.billingStreet}
          onChange={handleChange}
          className="input"
        />
      </div>
      
        {/* City Field */}
        <div className="form-group">
          <label className="label">City</label>
          <input
            type="text"
            name="city"
            value={profile.billingCity}
            onChange={handleChange}
            className="input"
          />
        </div>
        </div>

        <div className="two-column">
        {/* State Field */}
        <div className="form-group">
          <label className="label">State</label>
          <input
            type="text"
            name="state"
            value={profile.billingState}
            onChange={handleChange}
            className="input"
          />
        </div>

      {/* Zip Code Field */}
      <div className="form-group">
        <label className="label">Zip Code</label>
        <input
          type="text"
          name="zip"
          value={profile.billingZip}
          onChange={handleChange}
          className="input"
        />
      </div>
      <button className="edit-button">Add Another Card</button>
      </div>

      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Home Address</h3>
      {/* Address Field */}
      <div className="two-column">
      <div className="form-group">
        <label className="label">Address</label>
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          className="input"
        />
      </div>
      
        {/* City Field */}
        <div className="form-group">
          <label className="label">City</label>
          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleChange}
            className="input"
          />
        </div>
        </div>

        <div className="two-column">
        {/* State Field */}
        <div className="form-group">
          <label className="label">State</label>
          <input
            type="text"
            name="state"
            value={profile.state}
            onChange={handleChange}
            className="input"
          />
        </div>

      {/* Zip Code Field */}
      <div className="form-group">
        <label className="label">Zip Code</label>
        <input
          type="text"
          name="zip"
          value={profile.zip}
          onChange={handleChange}
          className="input"
        />
      </div>
      </div>

      {/* Buttons */}
      <div className="button-group">
        <button
          onClick={handleSave}
          className="button button-save"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button className="button button-cancel">Cancel</button>
      </div>
    </div>

  );
};

export default ProfileEdit;
