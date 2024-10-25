// AdPopup.js
import React from 'react';
import './AdPopup.css'; // Import the CSS file for styling

const AdPopup = ({ onClose }) => {
  return (
    <div className="ad-popup">
      <button className="close-button" onClick={onClose}>X</button>
      <img src="/path/to/your/gif.gif" alt="Ad" className="ad-gif" />
      <p>Check out our latest offers!</p>
    </div>
  );
};

export default AdPopup;
