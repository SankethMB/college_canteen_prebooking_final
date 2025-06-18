import React, { useEffect, useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Cart, PlusCircle, EggFried } from 'react-bootstrap-icons';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    api.get('/menu').then(res => setMenu(res.data));
  }, []);

  const addToCart = (item) => {
    const exists = cart.find(i => i.id === item.id);
    const updatedCart = exists
      ? cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
        minHeight: '100vh',
        padding: '40px 0',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div className="d-flex align-items-center gap-3">
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
                boxShadow: '0 4px 10px rgba(255, 110, 64, 0.5)'
              }}
            >
              <EggFried />
            </div>
            <h2 className="text-white fw-bold mb-0">Browse Menu</h2>
          </div>
          <button
            onClick={() => window.location.href = '/cart'}
            className="btn fw-bold text-white d-flex align-items-center gap-2"
            style={{
              backgroundColor: '#ff6e40',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 16px',
              boxShadow: '0 4px 15px rgba(255, 110, 64, 0.4)'
            }}
          >
            <Cart /> View Cart ({cart.reduce((total, i) => total + i.quantity, 0)})
          </button>
        </div>

        {/* Menu Grid */}
        <div className="row">
          {menu.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div
                className="card h-100 border-0 shadow"
                style={{
                  borderRadius: '15px',
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
              >
                {item.image_url && (
                  <img
                    src={`http://localhost:5000/${item.image_url}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '15px',
                      borderTopRightRadius: '15px',
                    }}
                  />
                )}
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-semibold" style={{ color: '#ff6e40' }}>{item.name}</h5>
                    <p className="card-text text-muted mb-1">₹{item.price}</p>
                    {item.description && (
                      <p className="card-text small text-secondary">{item.description}</p>
                    )}
                  </div>
                  <button
                    className="btn w-100 text-white mt-3 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      backgroundColor: '#ff6e40',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 0',
                      fontWeight: '500'
                    }}
                    onClick={() => addToCart(item)}
                  >
                    <PlusCircle /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {menu.length === 0 && (
          <div className="text-center text-white mt-5">
            <p>Loading items... or no menu found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
