import React from "react";
import "../styles/ConfirmationModal.css";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-modal">
            <div className="confirmation-modal-content">
                <p>{message}</p>
                <div className="confirmation-buttons">
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
