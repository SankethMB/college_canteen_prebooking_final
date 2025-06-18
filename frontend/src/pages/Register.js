import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersonFill, EnvelopeFill, KeyFill } from 'react-bootstrap-icons';
import logo from '../assets/bitebook_logo.png';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    // Basic validation: .com email & min‑8 char password
    const emailRe = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRe.test(form.email)) return alert('Email must end with .com');
    if (form.password.length < 8) return alert('Password must be at least 8 characters');
    try {
      await api.post('/auth/register', form);
      alert('🎉 Registration successful!');
      navigate('/');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: 'linear-gradient(135deg, #ff7e5f, #feb47b)' }}>
      <form onSubmit={handleSubmit} className="p-5 shadow glass-card text-center"
        style={{
          width: '100%', maxWidth: '400px',
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderRadius: '20px'
        }}>
        <img src={logo} alt="BiteBook Logo" style={{ width: '80px', marginBottom: '20px' }} />
        <h2 className="fw-bold" style={{ color: '#4e2a1e' }}>BiteBook</h2>
        <p className="mb-4 fw-medium">Create your account</p>

        <div className="input-group mb-3 glass-input">
          <span className="input-group-text bg-transparent"><PersonFill /></span>
          <input name="name" placeholder="Full Name" className="form-control" value={form.name}
            onChange={handleChange} required />
        </div>
        <div className="input-group mb-3 glass-input">
          <span className="input-group-text bg-transparent"><EnvelopeFill /></span>
          <input name="email" type="email" placeholder="Email" className="form-control" value={form.email}
            onChange={handleChange} required />
        </div>
        <div className="input-group mb-4 glass-input">
          <span className="input-group-text bg-transparent"><KeyFill /></span>
          <input name="password" type="password" placeholder="Password" className="form-control" value={form.password}
            onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <select name="role" className="form-select" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-block"
          style={{
            backgroundColor: '#ff6e40',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '10px',
            padding: '10px',
            transition: 'background 0.3s'
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = '#ff5c2e')}
          onMouseLeave={e => (e.target.style.backgroundColor = '#ff6e40')}
        >
          Register
        </button>

        <p className="mt-4 text-muted">
          Already have an account?{' '}
          <Link to="/" className="fw-bold" style={{ color: '#d84315' }}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
