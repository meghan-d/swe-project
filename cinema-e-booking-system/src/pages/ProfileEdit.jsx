import React, { useState } from "react";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  // State Management
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Validate Inputs
  const validate = () => {
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

  // Save Profile
  const handleSave = () => {
    if (!validate()) return;

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMessage("Profile saved successfully!");
    }, 2000);
  };

  return (
    <div className="container">
      <h2 className="title">Edit Profile</h2>

      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

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

      {/* Email Field */}
      <div className="form-group">
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="input"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
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
