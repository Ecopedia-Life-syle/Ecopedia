import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login, isAuthenticated, isLoading, isError, message } = useAuth();
  const navigate = useNavigate();

  const { username, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      alert('Username dan password tidak boleh kosong');
      return;
    }
    login(username, password);
  };

  return (
    <div className="form-container">
      <h1>Masuk</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        {/* Ini adalah bagian autentikasi kesalahan password */}
        {isError && <div className="error-message">{message}</div>}
        <input type="submit" value={isLoading ? 'Memproses...' : 'Masuk'} className="btn btn-primary btn-block" disabled={isLoading} />
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
};

export default Login;