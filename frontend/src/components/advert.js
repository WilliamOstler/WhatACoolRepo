// src/components/Advert.js
import React from 'react';
import './Advert.css'; // Optional: Create a CSS file for styling

const Advert = () => {
  return (
    <div className="advert">
      <h2>YOU ARE A WINNER</h2>
      <p>Claim your new LAMBORGHINI now!</p>
      <img src="tenor (1).gif" alt="Notification GIF" className="notification-gif" />
      <button>CLAIM</button>
    </div>
  );
};

export default Advert;
