import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserHome = () => {
  const [email, setEmail] = useState('email');
  const [pin, setPin] = useState('pin');
  const [name, setName] = useState('name');
  const [mobileNumber, setMobileNumber] = useState('9874563210');

  useEffect(() => {
    axios
      .post('/getuserdata', { token: localStorage.getItem('token') })
      .then(res => {
        setEmail(res.data.email);
        setPin(res.data.pin);
        setMobileNumber(res.data.mobileNumber);
      })
      .catch(err => console.log(err));
  }, []);

  const updateData = value => {
    const data = FormData();
    data.append('token', localStorage.getItem('token'));
    switch (value) {
      case 'pin':
        // data.append('email', email);
        data.append('pin', pin);
        axios
          .post('/updatedetails/:pin', data)
          .then(res => {
            alert('pin changed');
          })
          .catch(err => console.log(err));
        break;
      case 'mobile':
        // data.append('email', email);
        data.append('mobileNumber', mobileNumber);
        axios
          .post('/updatedetails/:mobileNumber', data)
          .then(res => {
            alert('mobile number changed');
          })
          .catch(err => console.log(err));
        break;
      case 'name':
        // data.append('email', email);
        data.append('name', name);
        axios
          .post('/updatedetails/:name', data)
          .then(res => {
            alert('name changed');
          })
          .catch(err => console.log(err));
        break;
      default:
        break;
    }
  };

  return (
    <div className="box">
      <div className="formdiv">
        <form>
          <h2>{email}</h2>
          <label>Name</label>
          <input
            type="text"
            value={name}
            placeholder={name}
            pattern="[0-9]+"
            onChange={e => setName(e.target.value)}
            required
          />
          <button onClick={() => updateData('name')} className="button">
            Update Name
          </button>
          <label>PIN</label>
          <input
            type="password"
            value={pin}
            placeholder={pin}
            pattern="[0-9]+"
            onChange={e => setPin(e.target.value)}
            required
          />
          <button onClick={() => updateData('pin')} className="button">
            Update Pin
          </button>
          <label>Mobile Number</label>
          <input
            type="tel"
            value={mobileNumber}
            placeholder={mobileNumber}
            pattern="[0-9]{10}"
            onChange={e => setMobileNumber(e.target.value)}
            required
          />
          <button onClick={() => updateData('mobile')} className="button">
            Update Mobile No.
          </button>
          <button
            onClick={() => updateData('mobile')}
            className="button logout"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserHome;
