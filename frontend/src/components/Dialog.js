// src/components/Dialog.js
import React from 'react';
import './Dialog.css'; // Create this CSS file for basic styling

const Dialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-content">
                <button className="dialog-close" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Dialog;
