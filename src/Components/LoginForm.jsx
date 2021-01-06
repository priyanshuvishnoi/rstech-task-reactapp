import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import '../styles/form.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/userhome');
    }
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = FormData();
    formData.append('email', email);
    formData.append('pin', pin);
    axios.post('/userlogin', formData).then(res => {
      localStorage.setItem('token', res.data.token);
      history.push('/userhome');
    });
  };

  return (
    <div className="box">
      <div className="formdiv">
        <form onSubmit={handleSubmit}>
          <div className="heading">
            <h1>Login</h1>
            <Link to="/signup">
              <h3>Sign Up</h3>
            </Link>
            <Link to="/adminlogin">
              <h3>Admin Login</h3>
            </Link>
          </div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label>PIN</label>
          <input
            type="password"
            value={pin}
            pattern="[0-9]+"
            onChange={e => setPin(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
