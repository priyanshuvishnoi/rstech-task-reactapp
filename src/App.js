import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminHome from './Components/AdminHome';
import UserHome from './Components/UserHome';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import AdminLogin from './Components/AdminLogin';
import "./styles/app.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/adminlogin" component={AdminLogin} />
        <ProtectedRoute path="/userhome" component={UserHome} />
        <ProtectedRoute path="/adminhome" component={AdminHome} />
      </Switch>
    </Router>
  );
};

export default App;
