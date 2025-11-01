import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
  const { register, isAuthenticated, isLoading, isError, message } = useAuth();
  const navigate = useNavigate();

  const { username, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const checkPasswordStrength = (pass) => {
    let score = 0;
    let feedback = '';
    if (!pass) return { score: 0, feedback: '' };
    if (pass.length >= 8) score++;
    if (pass.match(/[a-z]+/)) score++;
    if (pass.match(/[A-Z]+/)) score++;
    if (pass.match(/[0-9]+/)) score++;
    if (pass.match(/[$@#&!]+/)) score++;

    switch (score) {
      case 0:
      case 1:
        feedback = 'Sangat Lemah';
        break;
      case 2:
        feedback = 'Lemah';
        break;
      case 3:
        feedback = 'Sedang';
        break;
      case 4:
        feedback = 'Kuat';
        break;
      case 5:
        feedback = 'Sangat Kuat';
        break;
      default:
        feedback = '';
    }
    return { score, feedback };
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      setPasswordStrength(checkPasswordStrength(e.target.value));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      alert('Username dan password tidak boleh kosong');
      return;
    }
    register(username, password);
  };

  return (
    <div className="form-container">
      <h1>Daftar Akun</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
          <div className={`password-strength strength-${passwordStrength.score}`}>
            <div className="strength-bar"></div>
            <span className="strength-text">{passwordStrength.feedback}</span>
          </div>
        </div>
        {isError && <div className="error-message">{message}</div>}
        <input type="submit" value={isLoading ? 'Mendaftar...' : 'Daftar'} className="btn btn-primary btn-block" disabled={isLoading} />
      </form>
      <p>
        Sudah punya akun? <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
};

export default Register;