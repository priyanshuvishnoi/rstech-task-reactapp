import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { url } from '../config.json';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const getUsers = () => {
    const token = localStorage.getItem('token');
    axios
      .get(url + `/admin/getusers/:${token}`)
      .then(res => {
        setUsers(res.data.users);
      })
      .catch(err => console.log(err));
  };
  useEffect(getUsers, []);

  const blockHandler = id => {
    axios
      .get(url + `/admin/blockuser/:${id}`)
      .then(res => alert('user blocked'))
      .catch(err => console.log(err));
  };

  const deleteHandler = id => {
    axios
      .get(url + `/admin/deleteuser/:${id}`)
      .then(res => alert('user deleted'))
      .catch(err => console.log(err));
    getUsers();
  };

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={Math.floor(Math.random() * 1000)}>
            <h2>
              {user.name}, {user.email}
            </h2>{' '}
            <button onClick={() => deleteHandler(user._id)}>Delete</button>{' '}
            <button onClick={() => blockHandler(user._id)}>Block</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          history.push('/');
        }}
        className="button logout"
      >
        Logout
      </button>
    </>
  );
};

export default AdminHome;
