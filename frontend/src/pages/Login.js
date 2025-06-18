import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/bitebook_logo.png'; // Use your BiteBook logo here

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate(res.data.role === 'admin' ? '/admin' : '/menu');
    } catch (err) {
      alert('Invalid credentials!');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
      }}
    >
      <div
        className="p-5 shadow"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#fff0e0',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 0 30px rgba(255, 110, 64, 0.3)',
        }}
      >
        <img
          src={logo}
          alt="BiteBook Logo"
          style={{ width: '80px', marginBottom: '20px' }}
        />
        <h2 className="fw-bold" style={{ color: '#4e2a1e' }}>
          BiteBook
        </h2>
        <p className="mb-4" style={{ fontWeight: '500' }}>Login to your account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ffb389' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-4"
            value={form.password}
            onChange={handleChange}
            required
            style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ffb389' }}
          />
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#ff6e40',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            Login
          </button>
        </form>

        <p className="mt-4" style={{ color: '#4e2a1e' }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: '#d84315', fontWeight: 'bold' }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
