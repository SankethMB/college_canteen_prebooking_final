import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
const Footer = () => {
  return (
    <footer
      className="text-light py-4 mt-5"
      style={{
        background: 'linear-gradient(to right, rgba(255,126,95,0.85), rgba(254,180,123,0.85))',
        color: '#1e1e1e',
        borderTop: '3px solid #ff6e40',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '10px 10px 0 0',
        marginTop: '10px',
      }}
    >
      <div className="container text-center py-3">
        <h5 className="fw-bold" style={{ color: '#fff' }}>
          <i className="bi bi-egg-fried me-2"></i>BiteBook
        </h5>
        <small className="fw-light" style={{ color: '#fff' }}>
          &copy; {new Date().getFullYear()} BiteBook. All rights reserved.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
