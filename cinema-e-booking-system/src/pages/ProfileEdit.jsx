// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./ProfileEdit.css";

// const ProfileEdit = () => {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     cardType: "",
//     cardNumber: "",
//     expirationDate: "",
//     billingStreet: "",
//     billingCity: "",
//     billingState: "",
//     billingZip: "",
//     addressStreet: "",
//     addressCity: "",
//     addressState: "",
//     addressZip: "",
//   });

//   const [isSaving, setIsSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       const email = localStorage.getItem("email"); 
//       if (!email) {
//         console.error("No email found in local storage");
//         return;
//       }
  
//       const response = await axios.get(`http://localhost:5000/api/profile?email=${email}`);
  
//       console.log("Fetched user profile:", response.data);  
  
//       if (response.data) {
//         setProfile({
//           name: response.data.name || "",
//           email: response.data.email || "",
//           phone: response.data.phone || "",
//           cardType: response.data.cardType || "",
//           cardNumber: response.data.cardNumber || "",
//           expirationDate: response.data.expirationDate ? response.data.expirationDate.split("T")[0] : "", // Extracting YYYY-MM-DD
//           billingStreet: response.data.billingStreet || "",
//           billingCity: response.data.billingCity || "",
//           billingState: response.data.billingState || "",
//           billingZip: response.data.billingZip || "",
//           addressStreet: response.data.street || "", // Fixing mismatch
//           addressCity: response.data.city || "",
//           addressState: response.data.state || "",
//           addressZip: response.data.zip || "",
//         });
//       } else {
//         console.error("No user data received");
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };
  
  
  

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // const handleSave = async () => {
//   //   setIsSaving(true);
//   //   setSuccessMessage("fetched");
//   //   setErrorMessage("");
  
//   //   try {
//   //     console.log("Sending update request with:", profile); // Debugging log
  
//   //     const response = await axios.put("/edit-profile", profile);
//   //     console.log("Update response:", response.data); // Debugging log
  
//   //     if (response.data.message) {
//   //       setSuccessMessage("Profile updated successfully!");
//   //     } else {
//   //       setErrorMessage("Failed to update profile.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error saving profile:", error);
//   //     setErrorMessage("Failed to save profile. Please try again.");
//   //   } finally {
//   //     setIsSaving(false);
//   //   }
//   // };
  
// //   const handleSave = async () => {
// //     setIsSaving(true);
// //     setSuccessMessage("");
// //     setErrorMessage("");

// //     try {
// //         console.log("Sending update request with:", profile); // Debug log

// //         const response = await axios.put("http://localhost:5000/edit-profile", profile, {
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //         });

// //         console.log("Update response:", response.data); // Debug log

// //         if (response.data.message) {
// //             setSuccessMessage("Profile updated successfully!");
// //         } else {
// //             setErrorMessage("Failed to update profile.");
// //         }
// //     } catch (error) {
// //         console.error("Error saving profile:", error);
// //         if (error.response) {
// //             console.error("Server responded with:", error.response.data);
// //             setErrorMessage(error.response.data.error || "Failed to save profile.");
// //         } else {
// //             setErrorMessage("Network error. Please try again.");
// //         }
// //     } finally {
// //         setIsSaving(false);
// //     }
// // };

// const handleSave = async () => {
//   setIsSaving(true);
//   setSuccessMessage("");
//   setErrorMessage("");

//   // Ensure expirationDate is in 'YYYY-MM-DD' format
//   let formattedExpirationDate = profile.expirationDate;
//   if (formattedExpirationDate && formattedExpirationDate.length === 7) {
//     formattedExpirationDate = `${formattedExpirationDate}-01`;
//   }

//   const updatedProfile = { ...profile, expirationDate: formattedExpirationDate };

//   try {
//     console.log("Sending update request with:", updatedProfile); // Debug log

//     const response = await axios.put("http://localhost:5000/edit-profile", updatedProfile, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     console.log("Update response:", response.data); // Debug log

//     if (response.data.message) {
//       setSuccessMessage("Profile updated successfully!");
//       setTimeout(() => navigate("/"), 2000); // Navigate after success

//     } else {
//       setErrorMessage("Failed to update profile.");
//     }
//   } catch (error) {
//     console.error("Error saving profile:", error);
//     if (error.response) {
//       console.error("Server responded with:", error.response.data);
//       setErrorMessage(error.response.data.error || "Failed to save profile.");
//     } else {
//       setErrorMessage("Network error. Please try again.");
//     }
//   } finally {
//     setIsSaving(false);
//   }
// };

//   return (
//     <div className="container">
//       <h2 className="title">Edit Profile</h2>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       {successMessage && <div className="success-message">{successMessage}</div>}

//       <h3 className="text-lg text-yellow-400">Personal Information</h3>
//       <div className="form-group">
//         <label className="label">Name</label>
//         <input type="text" name="name" value={profile.name} onChange={handleChange} className="input" />
//       </div>

//       <div className="form-group">
//         <label className="label">Phone</label>
//         <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="input" />
//       </div>

//       <h3 className="text-lg text-yellow-400 mt-6 mb-2">Payment Information and Billing Address</h3>
//       <div className="two-column">
//         <div className="card">{profile.cardType} ****{profile.cardNumber.slice(-4)}</div>
//         <button className="delete-button">Remove Card</button>
//       </div>

//       <div className="form-group">
//         <label className="label">Card Number</label>
//         <input type="text" name="cardNumber" value={profile.cardNumber} onChange={handleChange} className="input" />
//       </div>

//       <div className="two-column">
//         <div className="form-group">
//           <label className="label">Card Type</label>
//           <input type="text" name="cardType" value={profile.cardType} onChange={handleChange} className="input" />
//         </div>
//         <div className="form-group">
//           <label className="label">Expiration Date</label>
//           <input type="month" name="expirationDate" value={profile.expirationDate} onChange={handleChange} className="input" />
//         </div>
//       </div>

//       <h3 className="text-lg text-yellow-400 mt-6 mb-2">Home Address</h3>
//       <div className="two-column">
//         <div className="form-group">
//           <label className="label">Street</label>
//           <input type="text" name="addressStreet" value={profile.addressStreet} onChange={handleChange} className="input" />
//         </div>
//         <div className="form-group">
//           <label className="label">City</label>
//           <input type="text" name="addressCity" value={profile.addressCity} onChange={handleChange} className="input" />
//         </div>
//       </div>

//       <div className="two-column">
//         <div className="form-group">
//           <label className="label">State</label>
//           <input type="text" name="addressState" value={profile.addressState} onChange={handleChange} className="input" />
//         </div>
//         <div className="form-group">
//           <label className="label">Zip Code</label>
//           <input type="text" name="addressZip" value={profile.addressZip} onChange={handleChange} className="input" />
//         </div>
//       </div>

//       <div className="button-group">
//         <button onClick={handleSave} className="button button-save" disabled={isSaving}>
//           {isSaving ? "Saving..." : "Save"}
//         </button>
//         <button 
//           onClick={() => navigate("/")} 
//           className="button button-cancel"
//         >
//           Cancel
//         </button>

//       </div>
//     </div>
//   );
// };

// export default ProfileEdit;

import React, { useState, useEffect } from "react";
import "./ProfileEdit.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    paymentCards: [], // Default as empty array
    promotions: "",
    selectedCard: null
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false); // Track if adding a new card
  const [newCard, setNewCard] = useState({
    cardType: '',
    cardNumber: '',
    expirationDate: '',
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });


  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(sessionStorage.getItem('user')); 
      if (!user) {
        console.error("User is not logged in.");
        setSuccessMessage("You need to log in to edit your profile.");
        return; // Exit if no user is logged in
      }
      const userId = user.id;
      console.log("Requesting user data for userId:", userId);

      try {
        const response = await axios.get(`http://localhost:5000/edit-profile?userId=${userId}`);
        console.log("Response data:", response.data);
        // Ensure that paymentCards is always an array
        setProfile({
          ...response.data,
          paymentCards: response.data.paymentCards || [], // Default to empty array if undefined
          promotions: response.data.promotions === 1
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSuccessMessage("Failed to load user data. Please try again later.");
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only once when the component mounts

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const togglePromotions = () => {
    setProfile({ ...profile, promotions: !profile.promotions });
  };
  
  const handleCardSelect = (e) => {
    const selectedCard = profile.paymentCards.find(
      (card) => card.cardNumber === e.target.value
    );
    setProfile({
      ...profile,
      selectedCard: selectedCard,
    });
  };

  const removeCard = () => {
    const updatedCards = profile.paymentCards.filter(
      (card) => card.cardNumber !== profile.selectedCard.cardNumber
    );
    setProfile({
      ...profile,
      paymentCards: updatedCards,
      selectedCard: null, // Clear the selected card after removal
    });
  };

  const addNewCard = () => {
    if (profile.paymentCards.length < 4) {
      setIsAddingCard(true); // Set adding state to true
    }
  };
  
  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };
 
  const handleSaveNewCard = () => {
    if (newCard.cardType && newCard.cardNumber && newCard.expirationDate) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        paymentCards: [...prevProfile.paymentCards, newCard], // Add new card
      }));
      
      // Reset the new card state
      setNewCard({
        cardType: '',
        cardNumber: '',
        expirationDate: '',
        billingStreet: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
      });
  
      setIsAddingCard(false); // Close the form
    } else {
      alert("Please fill in all fields before adding the card.");
    }
  };
  

  // const handleSave = () => {
  //   setIsSaving(true);
  //   setTimeout(() => {
  //     setIsSaving(false);
  //     setSuccessMessage("Profile saved successfully!");
  //   }, 2000);
  // };


  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage("");
  
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      setSuccessMessage("You need to log in to save your profile.");
      setIsSaving(false);
      return;
    }
  
    const updatedProfile = {
      ...profile,
      userId: user.id, // Ensure the backend knows which user to update
      promotions: profile.promotions ? 1 : 0, // Convert boolean to integer if needed
    };
  
    try {
      const response = await axios.put("http://localhost:5000/edit-profile", updatedProfile);
      
      if (response.data.success) {
        setSuccessMessage("Profile saved successfully!");
      } else {
        throw new Error("Failed to save profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setSuccessMessage("Profile saved successfully!");
    }
  
    setIsSaving(false);
  };

  const handleInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

const handleChangePassword = async (e) => {
    e.preventDefault();
  
  
    const user = JSON.parse(sessionStorage.getItem('user')); // ✅ Get user info
    if (!user || !user.id) {
      alert("You must be logged in to change your password.");
      return;
    }
    const userId = user.id; // ✅ Define userId before using it
  
    try {
      const response = await axios.post("http://localhost:5000/change-password", {
        userId,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
  
      alert(response.data.message);
    } catch (error) {
      alert("Error changing password: " + error.response.data.message);
    }
  };
  

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <h2 className="title">Edit Profile</h2>
      <h3 className="title">Enter any information you want to change.</h3>

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

      <div className="form-group">
        <label className="label">Email</label>
        <input type="text" name="email" value={profile.email} onChange={handleChange} className="input disabled: opacity-50" disabled  />
      </div>

      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Change Password</h3>

      <form onSubmit={handleChangePassword} className="form-group">
        <label className="label">Current Password *</label>
        <input type="password" name="currentPassword" required onChange={handleInputChange}  value={passwordData.currentPassword} className="input"/>
        <label className="label">New Password *</label>
        <input type="password" name="newPassword" required onChange={handleInputChange}  value={passwordData.newPassword} className="input"/>
      </form>
      <div className="button-group">
          <button onClick={handleChangePassword} className="button button-save">Save Password</button>
      </div>



      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Payment Information and Billing Address</h3>

      <div className="form-group">
        <select onChange={handleCardSelect} className="input">
          <option value="">Select a card</option>
          {profile.paymentCards.map((card, index) => (
            <option key={index} value={card.cardNumber}>
              {card.cardType} ****{card.cardNumber.slice(-4)}
            </option>
          ))}
        </select>
      </div>
      
      {profile.selectedCard && (
        <div>
          <h3>Edit Card Information</h3>
          <div className="form-group">
            <label>Card Type</label>
            <input
              type="text"
              name="cardType"
              value={profile.selectedCard.cardType}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={profile.selectedCard.cardNumber}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Expiration Date</label>
            <input
              type="month"
              name="expirationDate"
              value={profile.selectedCard?.expirationDate?.slice(0, 7) || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Billing Street</label>
            <input
              type="text"
              name="billingStreet"
              value={profile.selectedCard.billingStreet}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Billing City</label>
            <input
              type="text"
              name="billingCity"
              value={profile.selectedCard.billingCity}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Billing State</label>
            <input
              type="text"
              name="billingState"
              value={profile.selectedCard.billingState}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Billing Zip Code</label>
            <input
              type="text"
              name="billingZip"
              value={profile.selectedCard.billingZip}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
      )}
   
      {isAddingCard && profile.paymentCards.length < 4 && (
      <div>
        <h3>Add New Card</h3>
      <div className="form-group">
        <label>Card Type</label>
        <input type="text" name="cardType" value={newCard.cardType} onChange={handleNewCardChange} className="input" />
      </div>
      <div className="form-group">
        <label>Card Number</label>
        <input
        type="text" name="cardNumber" value={newCard.cardNumber} onChange={handleNewCardChange} className="input" />
      </div>
      <div className="form-group">
        <label>Expiration Date</label>
        <input type="month" name="expirationDate" value={newCard.expirationDate} onChange={handleNewCardChange} className="input" />
      </div>

      {/* Billing Address Fields */}
      <div className="form-group">
        <label>Billing Street</label>
        <input type="text" name="billingStreet" value={newCard.billingStreet} onChange={handleNewCardChange} className="input" />
      </div>
      <div className="form-group">
        <label>Billing City</label>
        <input type="text" name="billingCity" value={newCard.billingCity} onChange={handleNewCardChange} className="input" />
      </div>
      <div className="form-group">
        <label>Billing State</label>
        <input
        type="text" name="billingState" value={newCard.billingState} onChange={handleNewCardChange} className="input" />
      </div>
      <div className="form-group">
        <label>Billing Zip Code</label>
        <input type="text" name="billingZip" value={newCard.billingZip} onChange={handleNewCardChange} className="input"
      />
      </div>
      
      <div className="button-group">
          <button onClick={handleSaveNewCard} className="button button-save">Save Card</button>
          <button onClick={() => setIsAddingCard(false)} className="button button-cancel">Cancel</button>
      </div>
      
      </div>
      )}

      <div className="button-group">
        {profile.paymentCards.length < 4 && !isAddingCard && (
          <button className="button edit-button" onClick={addNewCard}>
            Add Another Card
          </button>
        )}

        {profile.selectedCard && (
          <div>
            <button onClick={removeCard} className="button delete-button">
              Remove Card
            </button>
          </div>
        )}

      </div>
      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Address</h3>
      <div className="form-group">
        <label className="label">Street</label>
        <input type="text" name="billingStreet" value={profile.street} onChange={handleChange} className="input" />
      </div>
      <div className="form-group">
        <label className="label">City</label>
        <input type="text" name="billingCity" value={profile.city} onChange={handleChange} className="input" />
      </div>
      <div className="form-group">
        <label className="label">State</label>
        <input type="text" name="billingState" value={profile.state} onChange={handleChange} className="input" />
      </div>
      <div className="form-group">
        <label className="label">Zip Code</label>
        <input type="text" name="billingZip" value={profile.zip} onChange={handleChange} className="input" />
      </div>
      <div className="checkbox">
        <input type="checkbox" id="promotions" checked={profile.promotions} onChange={togglePromotions} />
        <label for="promotions">  Subscribe to Promotions! Already subscribed? Stay tuned for some amazing deals.</label>
      </div>
      <div className="button-group">
        <button onClick={handleSave} className="button button-save" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button className="button button-cancel" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>
    </div>
  );
};
export default ProfileEdit;