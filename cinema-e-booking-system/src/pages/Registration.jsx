// import React, { useState } from "react";
// import "./Registration.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     cardType: "",
//     cardNumber: "",
//     expirationDate: "",
//     billingStreet: "",
//     billingCity: "",
//     billingState: "",
//     billingZip: "",
//     street: "",
//     city: "",
//     state: "",
//     zip: ""
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!formData.password) newErrors.password = "Password is required";
//     if (!formData.phone) newErrors.phone = "Phone number is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const saveUserToAdmin = async (newUser) => {
//     //const existingUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
//     //localStorage.setItem("adminUsers", JSON.stringify([...existingUsers, newUser]));
//     try {
//       await axios.post("http://localhost:5000/registeredusers", newUser) // Send a POST request to your backend
//     } catch(error) {
//       console.error("Error saving user:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
    
//     const newUser = { name: formData.name, email: formData.email, password: formData.password,
//       phone: formData.phone, cardType: formData.cardType, cardNumber: formData.cardNumber,
//       expirationDate: formData.expirationDate, billingStreet: formData.billingStreet, billingCity: formData.billingCity,
//       billingState: formData.billingState, billingZip: formData.billingZip, addressStreet: formData.street,
//       addressCity: formData.city, addressState: formData.state, addressZip: formData.zip };
    
//     saveUserToAdmin(newUser); // Save user to admin
//     setIsSubmitting(true);
//     setTimeout(() => {
//         navigate("/registration-confirm");
//     }, 2000);
//   };

//   return (
//     <div className="registration-container">
//       <h2 className="registration-title">🎟️ VIP Registration</h2>
//       <form onSubmit={handleSubmit} className="registration-form">
//       <h3 className="section-title">Personal Information</h3>
//         <div className="form-group">
//           <label className="label">Full Name *</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} className="input"/>
//           {errors.name && <div className="error-message">{errors.name}</div>}
//         </div>

//         <div className="form-group">
//           <label className="label">Email Address *</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} className="input"/>
//           {errors.email && <div className="error-message">{errors.email}</div>}
//         </div>

//         <div className="form-group">
//           <label className="label">Password *</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} className="input"/>
//           {errors.password && <div className="error-message">{errors.password}</div>}
//         </div>

//         <div className="form-group">
//           <label className="label">Phone Number *</label>
//           <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input"/>
//           {errors.phone && <div className="error-message">{errors.phone}</div>}
//         </div>

//         <h3 className="section-title">Payment Information and Billing Address (Optional)</h3>
//         <div className="form-group">
//           <label className="label">Card Number</label>
//           <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} className="input"/>
//         </div>
//         <div className="two-column">
//         <div className="form-group">
//           <label className="label">Card Type</label>
//           <input type="text" name="cardType" value={formData.cardType} onChange={handleChange} className="input"/>
//         </div>
//         <div className="form-group">
//           <label className="label">Expiration Date</label>
//           <input type="month" name="expirationDate" value={formData.expirationDate} onChange={handleChange} className="input"/>
//         </div>
//         </div>

//         <div className="two-column">
//         <div className="form-group">
//           <label className="label">Street Address</label>
//           <input type="text" name="billingStreet" value={formData.billingStreet} onChange={handleChange} className="input"/>
//         </div>
//         <div className="form-group">
//           <label className="label">City</label>
//           <input type="text" name="billingCity" value={formData.billingCity} onChange={handleChange} className="input"/>
//         </div>
//         </div>
//         <div className="two-column">
//         <div className="form-group">
//           <label className="label">State</label>
//           <input type="text" name="billingState" value={formData.billingState} onChange={handleChange} className="input"/>
//         </div>
//         <div className="form-group">
//           <label className="label">Zip Code</label>
//           <input type="text" name="billingZip" value={formData.billingZip} onChange={handleChange} className="input"/>
//         </div>
//         <button className="payment-button">Add Another Card</button>
//         </div>

//         <h3 className="section-title">Home Address (Optional)</h3>
//         <div className="two-column">
//           <div className="form-group">
//             <label className="label">Street Address</label>
//             <input type="text" name="street" value={formData.street} onChange={handleChange} className="input" />
//           </div>
//           <div className="form-group">
//             <label className="label">City</label>
//             <input type="text" name="city" value={formData.city} onChange={handleChange} className="input" />
//           </div>
//         </div>
//         <div className="two-column">
//         <div className="form-group">
//           <label className="label">State</label>
//           <input type="text" name="state" value={formData.billingState} onChange={handleChange} className="input"/>
//         </div>
//         <div className="form-group">
//           <label className="label">Zip Code</label>
//           <input type="text" name="zip" value={formData.billingZip} onChange={handleChange} className="input"/>
//         </div>
//         </div>
//         <div className = "checkbox">
//           <input type="checkbox" id="promotions" name="promotions" unchecked />
//           <label for="promotions"> Click here to register for promotional emails.</label>
//         </div>
//         <button type="submit" className="button button-save" disabled={isSubmitting}>
//           {isSubmitting ? "Registering..." : "Join Now"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Registration;

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
    cards: [ { cardType: "", cardNumber: "", expirationDate: "",
    billingStreet: "", billingCity: "", billingState: "", billingZip: "" }],
    street: "",
    city: "",
    state: "",
    zip: "",
    promotions: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, promotions: e.target.checked });
  };

   // Handle input change for card details dynamically
   const handleCardChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCards = [...formData.cards];
    updatedCards[index][name] = value;
    setFormData({ ...formData, cards: updatedCards });
  };

  // Add a new card when the button is clicked
  const addMoreCards = () => {
    if (formData.cards.length < 3) {
      setFormData({
        ...formData,
        cards: [...formData.cards, { cardType: "", cardNumber: "", expirationDate: "",
               billingStreet: "", billingCity: "", billingState: "", billingZip: "" }]
      });
    }
  };

  // Remove a specific card and leave the rest
  const handleRemovingCard = (index) => {
    if (formData.cards.length > 1) {
      setFormData((prevState) => {
        return { ...prevState, cards: prevState.cards.filter((card, i) => i !== index) };
      });
    }
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
  
  //sends a users data to the backend
  const saveUserToAdmin = async (newUser) => {
    try {
      await axios.post("http://localhost:5000/register", newUser) // Send a POST request to your backend
      setTimeout(() => {
        navigate("/registration-confirm");
      }, 2000);
      setIsSubmitting(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Show an alert when the email or phone number already exists
        alert(error.response.data.message);
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newUser = { name: formData.name, email: formData.email, password: formData.password,
      phone: formData.phone, cards : formData.cards, addressStreet: formData.street,
      addressCity: formData.city, addressState: formData.state, addressZip: formData.zip, promotions: formData.promotions };
    saveUserToAdmin(newUser); // Save user to admin
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
        {formData.cards.map((card, index) => ( //maps through the 3 cards index 0-2
          <div key={index} className="card-section">
            <div className="form-group">
              <label className="label">Card Number</label>
              <input type="text" name="cardNumber" value={card.cardNumber} onChange={(e) => handleCardChange(index, e)} className="input"/>
            </div>
            <div className="two-column">
              <div className="form-group">
                <label className="label">Card Type</label>
                <input type="text" name="cardType" value={card.cardType} onChange={(e) => handleCardChange(index, e)} className="input"/>
              </div>
              <div className="form-group">
                <label className="label">Expiration Date</label>
                <input type="month" name="expirationDate" value={card.expirationDate} onChange={(e) => handleCardChange(index, e)} className="input"/>
              </div>
            </div>
            <div className="two-column">
              <div className="form-group">
                <label className="label">Billing Street</label>
                <input type="text" name="billingStreet" value={card.billingStreet} onChange={(e) => handleCardChange(index, e)} className="input"/>
              </div>
              <div className="form-group">
                <label className="label">City</label>
                <input type="text" name="billingCity" value={card.billingCity} onChange={(e) => handleCardChange(index, e)} className="input"/>
              </div>
            </div>
            <div className="two-column">
              <div className="form-group">
                <label className="label">State</label>
                <input type="text" name="billingState" value={card.billingState} onChange={(e) => handleCardChange(index,e)} className="input"/>
              </div>
              <div className="form-group">
                <label className="label">Zip Code</label>
                <input type="text" name="billingZip" value={card.billingZip} onChange={(e) => handleCardChange(index,e)} className="input"/>
              </div>
            </div>
            {formData.cards.length > 1 && (
              <button type="button" className="remove-card-button" onClick={() => handleRemovingCard(index)}>Remove Card</button>
            )}
          </div>
        ))}
        {formData.cards.length < 3 && (
          <button type="button" className="payment-button" onClick={addMoreCards}>Add Another Card</button>
        )}

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
          <input type="text" name="state" value={formData.state} onChange={handleChange} className="input"/>
        </div>
        <div className="form-group">
          <label className="label">Zip Code</label>
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="input"/>
        </div>
        </div>
        <div className = "checkbox">
          <input type="checkbox" id="promotions" name="promotions" checked={formData.promotions} onChange={handleCheckboxChange} />
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

