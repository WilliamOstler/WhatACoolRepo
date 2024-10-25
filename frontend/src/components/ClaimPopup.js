// ClaimPopup.js
import React, { useState } from 'react';
import './ClaimPopup.css';

const ClaimPopup = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Claim submitted! Name: ${name}, Email: ${email}`);
    onClose(); // Close the ClaimPopup after submission
  };

  return (
    <div className="claim-popup">
      <button className="close-button" onClick={onClose}>X</button>
      <h1>Claim Your Lamborghini!</h1>
      <h2>We just need to collect some details first!!!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Account Number:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="email">CVV Number:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClaimPopup;
