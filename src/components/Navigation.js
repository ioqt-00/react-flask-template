import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul className="main-nav">
        <li className="main-nav"><NavLink className="main-nav" to="/home">Home</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;
