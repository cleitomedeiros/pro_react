import React from 'react';

const Modal = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;