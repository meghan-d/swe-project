import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    addressStreet: "",
    addressCity: "",
    addressState: "",
    addressZip: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const email = localStorage.getItem("email"); // Retrieve logged-in user's email
      if (!email) {
        console.error("No email found in local storage");
        return;
      }
  
      // const response = await axios.get(`/api/profile?email=${email}`);
      const response = await axios.get(`http://localhost:5000/api/profile?email=${email}`);

      console.log("Fetched user profile:", response.data); // Debugging log
  
      if (response.data) {
        setProfile(response.data); // Ensure data is set correctly
      } else {
        console.error("No user data received");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  
  

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // const handleSave = async () => {
  //   setIsSaving(true);
  //   setSuccessMessage("fetched");
  //   setErrorMessage("");
  
  //   try {
  //     console.log("Sending update request with:", profile); // Debugging log
  
  //     const response = await axios.put("/edit-profile", profile);
  //     console.log("Update response:", response.data); // Debugging log
  
  //     if (response.data.message) {
  //       setSuccessMessage("Profile updated successfully!");
  //     } else {
  //       setErrorMessage("Failed to update profile.");
  //     }
  //   } catch (error) {
  //     console.error("Error saving profile:", error);
  //     setErrorMessage("Failed to save profile. Please try again.");
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };
  
//   const handleSave = async () => {
//     setIsSaving(true);
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//         console.log("Sending update request with:", profile); // Debug log

//         const response = await axios.put("http://localhost:5000/edit-profile", profile, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         console.log("Update response:", response.data); // Debug log

//         if (response.data.message) {
//             setSuccessMessage("Profile updated successfully!");
//         } else {
//             setErrorMessage("Failed to update profile.");
//         }
//     } catch (error) {
//         console.error("Error saving profile:", error);
//         if (error.response) {
//             console.error("Server responded with:", error.response.data);
//             setErrorMessage(error.response.data.error || "Failed to save profile.");
//         } else {
//             setErrorMessage("Network error. Please try again.");
//         }
//     } finally {
//         setIsSaving(false);
//     }
// };

const handleSave = async () => {
  setIsSaving(true);
  setSuccessMessage("");
  setErrorMessage("");

  // Ensure expirationDate is in 'YYYY-MM-DD' format
  let formattedExpirationDate = profile.expirationDate;
  if (formattedExpirationDate && formattedExpirationDate.length === 7) {
    formattedExpirationDate = `${formattedExpirationDate}-01`;
  }

  const updatedProfile = { ...profile, expirationDate: formattedExpirationDate };

  try {
    console.log("Sending update request with:", updatedProfile); // Debug log

    const response = await axios.put("http://localhost:5000/edit-profile", updatedProfile, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Update response:", response.data); // Debug log

    if (response.data.message) {
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => navigate("/"), 2000); // Navigate after success

    } else {
      setErrorMessage("Failed to update profile.");
    }
  } catch (error) {
    console.error("Error saving profile:", error);
    if (error.response) {
      console.error("Server responded with:", error.response.data);
      setErrorMessage(error.response.data.error || "Failed to save profile.");
    } else {
      setErrorMessage("Network error. Please try again.");
    }
  } finally {
    setIsSaving(false);
  }
};

  return (
    <div className="container">
      <h2 className="title">Edit Profile</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <h3 className="text-lg text-yellow-400">Personal Information</h3>
      <div className="form-group">
        <label className="label">Name</label>
        <input type="text" name="name" value={profile.name} onChange={handleChange} className="input" />
      </div>

      <div className="form-group">
        <label className="label">Phone</label>
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="input" />
      </div>

      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Payment Information and Billing Address</h3>
      <div className="two-column">
        <div className="card">{profile.cardType} ****{profile.cardNumber.slice(-4)}</div>
        <button className="delete-button">Remove Card</button>
      </div>

      <div className="form-group">
        <label className="label">Card Number</label>
        <input type="text" name="cardNumber" value={profile.cardNumber} onChange={handleChange} className="input" />
      </div>

      <div className="two-column">
        <div className="form-group">
          <label className="label">Card Type</label>
          <input type="text" name="cardType" value={profile.cardType} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label className="label">Expiration Date</label>
          <input type="month" name="expirationDate" value={profile.expirationDate} onChange={handleChange} className="input" />
        </div>
      </div>

      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Home Address</h3>
      <div className="two-column">
        <div className="form-group">
          <label className="label">Street</label>
          <input type="text" name="addressStreet" value={profile.addressStreet} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label className="label">City</label>
          <input type="text" name="addressCity" value={profile.addressCity} onChange={handleChange} className="input" />
        </div>
      </div>

      <div className="two-column">
        <div className="form-group">
          <label className="label">State</label>
          <input type="text" name="addressState" value={profile.addressState} onChange={handleChange} className="input" />
        </div>
        <div className="form-group">
          <label className="label">Zip Code</label>
          <input type="text" name="addressZip" value={profile.addressZip} onChange={handleChange} className="input" />
        </div>
      </div>

      <div className="button-group">
        <button onClick={handleSave} className="button button-save" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button className="button button-cancel">Cancel</button>
      </div>
    </div>
  );
};

export default ProfileEdit;

