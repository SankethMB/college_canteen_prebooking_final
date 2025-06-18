import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/bitebook_logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow p-3 mb-4"
      style={{
        background: 'linear-gradient(to right, rgba(255,126,95,0.8), rgba(254,180,123,0.8))',
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid #ff6e40',
        borderRadius: '0 0 20px 20px',
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="BiteBook Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          <span
            className="fw-bold"
            style={{
              fontSize: '1.6rem',
              color: '#fff',
              letterSpacing: '1px',
            }}
          >
            BiteBook
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn && role === 'student' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold hover-effect" to="/menu">
                    <i className="bi bi-list"></i> Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold hover-effect" to="/cart">
                    <i className="bi bi-cart-fill"></i> Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold hover-effect" to="/order-history">
                    <i className="bi bi-clock-history"></i> My Orders
                  </Link>
                </li>
              </>
            )}

            {isLoggedIn && role === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold hover-effect" to="/manage-menu">
                    <i className="bi bi-pencil-square"></i> Manage Menu
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold hover-effect" to="/admin">
                    <i className="bi bi-speedometer2"></i> Admin Dashboard
                  </Link>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold hover-effect" to="/">
                    <i className="bi bi-box-arrow-in-right"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold hover-effect" to="/register">
                    <i className="bi bi-person-plus-fill"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {isLoggedIn && (
            <button
              className="btn btn-sm fw-semibold"
              onClick={handleLogout}
              style={{
                backgroundColor: '#ff6e40',
                border: 'none',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'background 0.3s ease',
              }}
            >
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
