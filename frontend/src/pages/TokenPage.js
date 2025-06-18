import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TokenPage({ token = 'CANTEEN2025-1234' }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d1b2a',
        color: '#e0e1dd',
        padding: '30px',
      }}
    >
      <div
        className="text-center p-5"
        style={{
          backgroundColor: '#1b263b',
          borderRadius: '20px',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 0 30px rgba(252, 128, 25, 0.2)',
          border: '2px solid #FC8019',
        }}
      >
        <h2 className="mb-4 fw-bold" style={{ color: '#FC8019' }}>
          🎫 Your Canteen Token
        </h2>

        <div
          className="d-inline-block p-3 mb-4"
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 0 15px rgba(252, 128, 25, 0.3)',
          }}
        >
          <QRCodeSVG value={token} size={200} fgColor="#0d1b2a" bgColor="#ffffff" />
        </div>

        <h4 className="mb-3">
          <span className="text-light">Token Number:</span>{' '}
          <span className="fw-bold" style={{ color: '#FC8019' }}>{token}</span>
        </h4>

        <p className="text-secondary small mb-0">
          Please present this QR code at the counter to collect your food. 🍽️
        </p>
      </div>
    </div>
  );
}

export default TokenPage;
