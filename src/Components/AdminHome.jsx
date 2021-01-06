import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [users, setUsers] = useState([
    { name: 'a', email: 'a@a', key: 0 },
    { name: 'b', email: 'b@b', key: 1 },
  ]);

  useEffect(() => {
    axios
      .get('/getusers')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const blockHandler = id => {
    axios
      .get(`/blockuser/:${id}`)
      .then(res => alert('user blocked'))
      .catch(err => console.log(err));
  };

  const deleteHandler = id => {
    axios
      .get(`/deleteuser/:${id}`)
      .then(res => alert('user deleted'))
      .catch(err => console.log(err));
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user._id}>
          <h2>
            {user.name}, {user.email}
          </h2>{' '}
          <button onClick={() => deleteHandler(user._id)}>Delete</button>{' '}
          <button onClick={() => blockHandler(user._id)}>Block</button>
        </li>
      ))}
    </ul>
  );
};

export default AdminHome;
