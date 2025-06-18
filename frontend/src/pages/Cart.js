import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Cart = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id, delta) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div
      className="container py-5"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
        color: '#2e2e2e',
      }}
    >
      <h2 className="text-center mb-4 fw-bold">
        <i className="bi bi-cart-fill me-2"></i>Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-muted"><i className="bi bi-emoji-frown me-2"></i>Your cart is empty.</p>
      ) : (
        <>
          <div className="table-responsive shadow">
            <table className="table table-borderless rounded overflow-hidden text-center" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)' }}>
              <thead className="text-dark" style={{ backgroundColor: '#ffffffaa' }}>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="align-middle text-dark fw-semibold">
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="btn btn-sm me-2"
                        style={{ color: '#ff6e40', borderColor: '#ff6e40' }}
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <i className="bi bi-dash-circle"></i>
                      </button>
                      {item.quantity}
                      <button
                        className="btn btn-sm ms-2"
                        style={{ color: '#ff6e40', borderColor: '#ff6e40' }}
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <i className="bi bi-plus-circle"></i>
                      </button>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-sm text-white"
                        style={{ backgroundColor: '#e63946', border: 'none' }}
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="bi bi-trash-fill"></i> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="text-end mt-4 text-dark fw-bold">
            Total: <span className="text-success">₹{getTotal()}</span>
          </h4>

          <div className="text-center mt-4">
            <button
              className="btn btn-lg fw-bold"
              style={{
                backgroundColor: '#ff6e40',
                border: 'none',
                color: '#fff',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#ff5722')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff6e40')}
              onClick={handleCheckout}
            >
              <i className="bi bi-credit-card-2-front-fill me-2"></i>Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
