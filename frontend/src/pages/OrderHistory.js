import React, { useEffect, useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/user');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError('⚠️ Failed to load order history');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '50px 0',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        fontFamily: 'Poppins, sans-serif',
        color: '#2e2e2e',
      }}
    >
      <div className="container">
        <div className="text-center mb-5 d-flex align-items-center justify-content-center gap-3">
          <div
            style={{
              backgroundColor: '#ff6e40',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              color: '#fff',
              boxShadow: '0 4px 10px rgba(255, 110, 64, 0.4)',
            }}
          >
            <i className="bi bi-folder2-open" />
          </div>
          <h2 className="fw-bold mb-0 text-dark">Order History</h2>
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        {orders.length === 0 ? (
          <p className="text-center text-dark fw-medium">No orders placed yet.</p>
        ) : (
          <div className="row">
            {orders.map((order, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div
                  className="card h-100 border-0 shadow-lg"
                  style={{
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                    transition: 'transform 0.3s ease',
                    color: '#333',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div className="card-body">
                    <h5 className="mb-3" style={{ color: '#ff6e40' }}>
                      <i className="bi bi-receipt-cutoff me-2" />
                      Order #{order.token}
                    </h5>
                    <p className="mb-1">
                      <i className="bi bi-calendar-event me-2" />
                      <strong>Ordered:</strong> {new Date(order.created_at).toLocaleString()}
                    </p>
                    <p className="mb-2">
                      <i className="bi bi-currency-rupee me-2" />
                      <strong>Total:</strong> ₹{order.total}
                    </p>
                    <div>
                      <i className="bi bi-basket me-2" />
                      <strong>Items:</strong>
                      <ul className="mb-0 mt-1">
                        {JSON.parse(order.items).map((item, i) => (
                          <li key={i} className="small">
                            {item.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
