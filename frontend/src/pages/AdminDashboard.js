import React, { useEffect, useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/all').then(res => setOrders(res.data));
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        minHeight: '100vh',
        padding: '40px 0',
        color: '#2e2e2e',
      }}
    >
      <div className="container">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            style={{
              backgroundColor: '#ff6e40',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#fff',
            }}
          >
            <i className="bi bi-speedometer2"></i>
          </div>
          <h2 className="fw-bold mb-0 text-dark">Admin Dashboard</h2>
        </div>

        <div
          className="table-responsive p-3"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <table className="table table-bordered table-hover table-light align-middle mb-0 rounded overflow-hidden">
            <thead className="table-warning text-dark">
              <tr>
                <th><i className="bi bi-123"></i> Token</th>
                <th><i className="bi bi-bag-fill"></i> Items</th>
                <th><i className="bi bi-cash-coin"></i> Total (₹)</th>
                <th><i className="bi bi-clock-history"></i> Status</th>
                <th><i className="bi bi-calendar-event"></i> Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="fw-bold text-warning">{order.token}</td>
                  <td>
                    {(() => {
                      try {
                        const items = JSON.parse(order.items);
                        return (
                          <ul className="mb-0 ps-3">
                            {items.map((item, index) => (
                              <li key={index}>
                                {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                              </li>
                            ))}
                          </ul>
                        );
                      } catch (err) {
                        return <span>{order.items}</span>;
                      }
                    })()}
                  </td>
                  <td><strong>₹{order.total}</strong></td>
                  <td>
                    {order.status ? (
                      <span className="text-success fw-semibold"><i className="bi bi-check-circle-fill me-1"></i>{order.status}</span>
                    ) : (
                      <span className="text-muted"><i className="bi bi-hourglass-split me-1"></i>Pending</span>
                    )}
                  </td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
