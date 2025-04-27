import React, { useState, useEffect } from "react";
import "./ProfileEdit.css";
import { useNavigate } from "react-router-dom";
import ProfileRequests from "../facade/ProfileRequests";

const ProfileEdit = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    paymentCards: [],
    promotions: "",
    selectedCard: null
  });

  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [originalCardNumber, setOriginalCardNumber] = useState("");
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

  const validateProfile = () => {
    if (profile.phone && !/^\d{10}$/.test(profile.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return false;
    }
    if (profile.selectedCard) {
      if (!profile.selectedCard.cardType) {
        alert("Please select a card type.");
        return false;
      }
      if (!/^\d{16}$/.test(profile.selectedCard.cardNumber)) {
        alert("Card number must be exactly 16 digits.");
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (!user) {
        console.error("User is not logged in.");
        setSuccessMessage("You need to log in to edit your profile.");
        return;
      }
      const userId = user.id;

      try {
        const response = await ProfileRequests.getUserProfile(userId);
        setProfile({
          name: response.name || "",
          email: response.email || "",
          phone: response.phone || "",
          street: response.addressStreet || "",
          city: response.addressCity || "",
          state: response.addressState || "",
          zip: response.addressZip || "",
          paymentCards: response.paymentCards || [],
          promotions: response.promotions === 1,
          selectedCard: null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSuccessMessage("Failed to load user data. Please try again later.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (profile.selectedCard) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        selectedCard: {
          ...prevProfile.selectedCard,
          [name]: value,
        },
        paymentCards: prevProfile.paymentCards.map((card) =>
          card.cardNumber === prevProfile.selectedCard.cardNumber
            ? { ...card, [name]: value }
            : card
        ),
      }));
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const togglePromotions = () => {
    setProfile({ ...profile, promotions: !profile.promotions });
  };

  const handleInputChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || !user.id) {
      alert("You must be logged in to change your password.");
      return;
    }

    try {
      const response = await ProfileRequests.changePassword(user.id, passwordData);
      alert(response.message);
    } catch (error) {
      alert("Incorrect current password");
    }
  };

  const handleCardSelect = (e) => {
    const selectedCard = profile.paymentCards.find(
      (card) => card.cardNumber === e.target.value
    );
    setProfile({ ...profile, selectedCard: selectedCard });
    setOriginalCardNumber(selectedCard.cardNumber);
  };

  const removeCard = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      await ProfileRequests.deleteCard(user.id, profile.selectedCard.cardNumber);
      setProfile({
        ...profile,
        paymentCards: profile.paymentCards.filter(
          (card) => card.cardNumber !== profile.selectedCard.cardNumber
        ),
        selectedCard: null,
      });
      alert("Card removed successfully.");
    } catch (error) {
      console.error("Error removing card:", error);
      alert("Failed to remove card.");
    }
  };

  const addNewCard = () => {
    if (profile.paymentCards.length < 4) {
      setIsAddingCard(true);
    }
  };

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleSaveNewCard = async () => {
    if (!newCard.cardType || !newCard.cardNumber || !newCard.expirationDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      const response = await ProfileRequests.addNewCard(user.id, newCard);
      setProfile((prevProfile) => ({
        ...prevProfile,
        paymentCards: [...prevProfile.paymentCards, newCard],
      }));
      setNewCard({
        cardType: '',
        cardNumber: '',
        expirationDate: '',
        billingStreet: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
      });
      setIsAddingCard(false);
      alert(response.message);
    } catch (error) {
      alert("Error adding card. Please try again.");
    }
  };

  const saveCardChanges = async () => {
    if (!validateProfile()) return;

    const res = await ProfileRequests.updateCard(originalCardNumber, profile);
    if (res) {
      alert(res.message);
    }
  };

  const handleSave = async () => {
    if (!validateProfile()) return;
  
    setIsSaving(true);
    const user = JSON.parse(sessionStorage.getItem("user"));
  
    try {
      const result = await ProfileRequests.updateProfile(user.id, profile);
      setSuccessMessage(result.message);
    } catch (error) {
      setSuccessMessage("Error updating profile. Please try again.");
    } finally {
      setIsSaving(false);
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
        <label className="label">Name *</label>
        <input type="text" name="name" value={profile.name} onChange={handleChange} className="input" />
      </div>
  
      <div className="form-group">
        <label className="label">Phone *</label>
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="input" />
      </div>
  
      <div className="form-group">
        <label className="label">Email *</label>
        <input type="text" name="email" value={profile.email} disabled className="input disabled:opacity-50" />
      </div>
  
      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Change Password</h3>
      <form onSubmit={handleChangePassword} className="form-group">
        <label className="label">Current Password *</label>
        <input type="password" name="currentPassword" required value={passwordData.currentPassword} onChange={handleInputChange} className="input" />
        <label className="label">New Password *</label>
        <input type="password" name="newPassword" required value={passwordData.newPassword} onChange={handleInputChange} className="input" />
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
            <select
              name="cardType"
              value={profile.selectedCard.cardType}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Card Type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Discover">Discover</option>
              <option value="American Express">American Express</option>
            </select>
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
              value={profile.selectedCard.expirationDate?.slice(0, 7) || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Billing Street</label>
            <input type="text" name="billingStreet" value={profile.selectedCard.billingStreet} onChange={handleChange} className="input" />
          </div>
          <div className="form-group">
            <label>Billing City</label>
            <input type="text" name="billingCity" value={profile.selectedCard.billingCity} onChange={handleChange} className="input" />
          </div>
          <div className="form-group">
            <label>Billing State</label>
            <input type="text" name="billingState" value={profile.selectedCard.billingState} onChange={handleChange} className="input" />
          </div>
          <div className="form-group">
            <label>Billing Zip Code</label>
            <input type="text" name="billingZip" value={profile.selectedCard.billingZip} onChange={handleChange} className="input" />
          </div>
  
          <div className="button-group">
            <button onClick={saveCardChanges} className="button button-save">Save Changes</button>
            <button onClick={removeCard} className="button delete-button">Remove Card</button>
          </div>
        </div>
      )}
  
      {isAddingCard && (
        <div>
          <h3>Add New Card</h3>
          <div className="form-group">
            <label>Card Type</label>
            <select
              name="cardType"
              value={newCard.cardType}
              onChange={handleNewCardChange}
              className="input"
            >
              <option value="">Select Card Type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Discover">Discover</option>
              <option value="American Express">American Express</option>
            </select>
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" name="cardNumber" value={newCard.cardNumber} onChange={handleNewCardChange} className="input" />
          </div>
          <div className="form-group">
            <label>Expiration Date</label>
            <input type="month" name="expirationDate" value={newCard.expirationDate} onChange={handleNewCardChange} className="input" />
          </div>
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
            <input type="text" name="billingState" value={newCard.billingState} onChange={handleNewCardChange} className="input" />
          </div>
          <div className="form-group">
            <label>Billing Zip Code</label>
            <input type="text" name="billingZip" value={newCard.billingZip} onChange={handleNewCardChange} className="input" />
          </div>
  
          <div className="button-group">
            <button onClick={handleSaveNewCard} className="button button-save">Save Card</button>
            <button onClick={() => setIsAddingCard(false)} className="button button-cancel">Cancel</button>
          </div>
        </div>
      )}
  
      <h3 className="text-lg text-yellow-400 mt-6 mb-2">Address</h3>
      <div className="form-group">
        <label className="label">Street</label>
        <input type="text" name="street" value={profile.street} onChange={handleChange} className="input" />
      </div>
      <div className="form-group">
        <label className="label">City</label>
        <input type="text" name="city" value={profile.city} onChange={handleChange} className="input" />
      </div>
      <div className="form-group">
        <label className="label">State</label>
        <input type="text" name="state" value={profile.state} onChange={handleChange} className="input" />
      </div>
      <div className="form-group">
        <label className="label">Zip Code</label>
        <input type="text" name="zip" value={profile.zip} onChange={handleChange} className="input" />
      </div>
  
      <div className="checkbox">
        <input type="checkbox" id="promotions" checked={profile.promotions} onChange={togglePromotions} />
        <label htmlFor="promotions">Subscribe to Promotions! Already subscribed? Stay tuned for amazing deals.</label>
      </div>
  
      <div className="button-group">
        <button onClick={handleSave} className="button button-save" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </button>
        <button onClick={() => navigate(-1)} className="button button-cancel">
          Cancel
        </button>
      </div>
    </div>
  );  
};
export default ProfileEdit;