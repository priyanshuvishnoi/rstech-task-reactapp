import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const formData = FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('pin', pin);
    formData.append('mobileNumber', mobileNumber);

    axios
      .post('/signup', formData)
      .then(res => {
        alert('Sign Up successful');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="box">
      <div className="formdiv">
        <form onSubmit={handleSubmit}>
          <div className="heading">
            <h1>SignUp</h1>
            <Link to="/">
              <h3>Sign In</h3>
            </Link>
            <Link to="/adminlogin">
              <h3>Admin Login</h3>
            </Link>
          </div>
          <label>name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <label>email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label>PIN</label>
          <input
            type="password"
            pattern="[0-9]+"
            value={pin}
            onChange={e => setPin(e.target.value)}
            required
          />
          <label>Mobile Number</label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={mobileNumber}
            onChange={e => setMobileNumber(e.target.value)}
            required
          />
          <button type="submit" className="button">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
