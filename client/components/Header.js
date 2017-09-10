import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.styl';

const Header = () => (
  <header>
    <ul className='header-menu'>
      <li className='header-menu-item'>
        <Link to='/'>Home</Link>
      </li>
      <li className='header-menu-item'>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li className='header-menu-item'>
        <Link to='/login'>Log In</Link>
      </li>
    </ul>
  </header>
);

export default Header;