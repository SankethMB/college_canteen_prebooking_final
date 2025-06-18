import React, { useEffect, useState } from 'react';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get('/menu');
      setMenu(res.data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Failed to fetch menu' });
    }
  };

  const addItem = async () => {
    if (!form.name || !form.price || !image) {
      setMessage({ type: 'warning', text: 'Fill name, price, and upload an image' });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('image', image);

      await api.post('/menu', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setForm({ name: '', description: '', price: '' });
      setImage(null);
      setMessage({ type: 'success', text: 'Item added successfully' });
      fetchMenu();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Failed to add item' });
    }
  };

  const deleteItem = async (id) => {
    try {
      await api.delete(`/menu/${id}`);
      setMessage({ type: 'success', text: 'Item deleted' });
      fetchMenu();
    } catch (err) {
      console.error(err);
      setMessage({ type: 'danger', text: 'Failed to delete item' });
    }
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <div className="container text-dark">
        <h2 className="fw-bold mb-4 text-center">
          <i className="bi bi-card-text me-2 text-white bg-dark rounded-circle p-2"></i> Manage Menu
        </h2>

        {message.text && (
          <div className={`alert alert-${message.type} shadow-sm`} role="alert">
            <i className={`bi ${message.type === 'danger' ? 'bi-x-circle' : message.type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'} me-2`}></i>
            {message.text}
          </div>
        )}

        <div className="row g-2 mb-4">
          <div className="col-md-3">
            <input className="form-control" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="col-md-2">
            <input type="file" className="form-control" accept="image/*" onChange={e => setImage(e.target.files[0])} />
          </div>
          <div className="col-md-2">
            <button
              className="btn w-100 text-white"
              style={{ backgroundColor: '#ff6e40' }}
              onClick={addItem}
            >
              <i className="bi bi-plus-circle me-1"></i> Add
            </button>
          </div>
        </div>

        <div className="row">
          {menu.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div
                className="card h-100 shadow border-0"
                style={{
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                {item.image_url && (
                  <img
                    src={`http://localhost:5000/${item.image_url}`}
                    alt={item.name}
                    className="card-img-top"
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '15px 15px 0 0'
                    }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title" style={{ color: '#ff6e40' }}>{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="fw-bold">₹{item.price}</p>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteItem(item.id)}
                  >
                    <i className="bi bi-trash-fill me-1"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageMenu;
