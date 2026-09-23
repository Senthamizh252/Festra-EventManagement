import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiX } from 'react-icons/fi';
import './Toast.css';

const Toast = ({ id, message, type, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    // Allow trigger of fade-out animation before unmounting
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300); // Length of the CSS fadeOutRight animation
    };

    const getIcon = () => {
        switch (type) {
            case 'success': return <FiCheckCircle className="toast-icon success" />;
            case 'error': return <FiXCircle className="toast-icon error" />;
            case 'info':
            default: return <FiInfo className="toast-icon info" />;
        }
    };

    return (
        <div className={`toast-message toast-${type} ${isClosing ? 'toast-fadeout' : 'toast-slidein'}`}>
            <div className="toast-icon-wrapper">
                {getIcon()}
            </div>
            <div className="toast-content">
                {message}
            </div>
            <button className="toast-close-btn" onClick={handleClose} aria-label="Close Toast">
                <FiX />
            </button>
        </div>
    );
};

export default Toast;
