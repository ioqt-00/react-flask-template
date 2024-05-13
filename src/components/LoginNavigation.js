import React from 'react';
import { NavLink } from 'react-router-dom';

const LoginNavigation = () => {
  return (
    <nav className="login-nav">
      <ul className="login-nav">
        <li className="login-nav"><NavLink className="login-nav" to="/signup">Sign Up</NavLink></li>
        <li className="login-nav"><NavLink className="login-nav" to="/login">Login</NavLink></li>
      </ul>
    </nav>
  );
}

export default LoginNavigation;
