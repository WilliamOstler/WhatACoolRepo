// AdPopup.js
import React, { useState } from 'react';
import './AdPopup.css';
import ClaimPopup from './ClaimPopup'; // Import the ClaimPopup component

const AdPopup = ({ onClose }) => {
  const [showClaimPopup, setShowClaimPopup] = useState(false);

  const handleClaim = () => {
    setShowClaimPopup(true); // Show the claim popup
  };

  return (
    <div className="ad-popup">
      <button className="close-button" onClick={onClose}>X</button>
      <img src="giphy.gif" alt="Ad" className="ad-gif" />
      <p><strong>YOU HAVE WON A NEW LAMBORGHINI WOWWW!</strong></p>
      <button className="claim-button" onClick={handleClaim}>Claim Here</button>
      
      {showClaimPopup && <ClaimPopup onClose={() => setShowClaimPopup(false)} />} {/* Show ClaimPopup */}
    </div>
  );
};

export default AdPopup;
