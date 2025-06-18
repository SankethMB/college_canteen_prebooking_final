import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Checkout = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [tokenData, setTokenData] = useState(null);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const navigate = useNavigate();

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      const total = getTotal();
      const authToken = localStorage.getItem('token');

      const res = await api.post(
        '/orders',
        { items: cart, total, payment_mode: paymentMode },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { token, payment_mode, items, total: orderTotal, created_at } = res.data;

      localStorage.removeItem('cart');
      setCart([]);
      setTokenData({ token, payment_mode, items, total: orderTotal, created_at });

      setTimeout(() => {
        navigate('/menu');
      }, 10000);
    } catch (err) {
      alert('Payment failed. Try again.');
      console.error(err);
    }
  };

  if (tokenData) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
          minHeight: '100vh',
          color: '#fff',
        }}
      >
        <div
          className="text-center p-5 shadow-lg"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(15px)',
            borderRadius: '20px',
            color: '#fff',
            maxWidth: '500px',
          }}
        >
          <h2 className="text-success mb-3"><i className="bi bi-check-circle-fill"></i> Order Confirmed!</h2>
          <p>Your token number is</p>
          <h1 className="display-4 fw-bold text-light">{tokenData.token}</h1>
          <p className="mt-3">Please show this token at the counter to collect your food.</p>
          <p className="text-light mt-2">Payment Mode: <strong>{tokenData.payment_mode}</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mt-5 p-4 shadow"
      style={{
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        borderRadius: '15px',
        color: '#2e2e2e',
        maxWidth: '700px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <h2 className="text-center mb-4 fw-bold"><i className="bi bi-receipt-cutoff me-2"></i>Checkout</h2>

      {cart.length === 0 ? (
        <div className="text-center py-4">
          <h4 className="text-danger"><i className="bi bi-cart-x me-2"></i>Your cart is empty</h4>
          <p>Add some delicious food to proceed.</p>
        </div>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: '#2e2e2e',
                }}
              >
                <span><i className="bi bi-box-seam me-2"></i>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <h4 className="mb-4 text-end">
            Total: <span className="text-dark fw-bold">₹{getTotal()}</span>
          </h4>

          <div className="mb-3">
            <label className="form-label fw-semibold"><i className="bi bi-credit-card-2-front-fill me-2"></i>Payment Mode</label>
            <select
              className="form-select"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>
          </div>

          <button
            className="btn w-100 fw-bold"
            style={{
              backgroundColor: '#ff6e40',
              border: 'none',
              color: '#fff',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#ff5722')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff6e40')}
            onClick={handlePayment}
          >
            <i className="bi bi-wallet2 me-2"></i>Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
