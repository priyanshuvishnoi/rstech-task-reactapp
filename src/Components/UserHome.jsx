import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { url } from '../config.json';

const UserHome = () => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios
      .post(url + '/users/getuserdata', {
        token: localStorage.getItem('token'),
      })
      .then(res => {
        setEmail(res.data.user.email);
        setPin(res.data.user.pin);
        setMobileNumber(res.data.user.mobileNumber);
        setName(res.data.user.name);
      })
      .catch(err => console.log(err));
  }, []);

  const updateData = value => {
    const token = localStorage.getItem('token');

    switch (value) {
      case 'pin':
        // data.append('email', email);

        axios
          .patch(url + '/users/updatedetails/:pin', { pin, token })
          .then(res => {
            alert('pin changed');
          })
          .catch(err => console.log(err));
        break;
      case 'mobile':
        // data.append('email', email);

        axios
          .patch(url + '/users/updatedetails/:mobileNumber', {
            token,
            mobileNumber,
          })
          .then(res => {
            alert('mobile number changed');
          })
          .catch(err => console.log(err));
        break;
      case 'name':
        // data.append('email', email);

        axios
          .patch(url + '/users/updatedetails/:name', { token, name })
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
        <h2>{email}</h2>
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder={name}
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
          onClick={() => {
            localStorage.removeItem('token');
            history.push('/');
          }}
          className="button logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserHome;
