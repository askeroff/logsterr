/* global window */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import '../styles/header.styl';

// refactor later

function logOut() {
  axios
    .get('/logout')
    .then(() => {
      window.location.href = '/';
    })
    .catch(err => console.log(err));
}

function guestLinks(user) {
  if (!user) {
    return (
      <ul className="header-menu">
        <li className="header-menu-item">
          <Link to="/">Home</Link>
        </li>
        <li className="header-menu-item">
          <Link to="/signup">Sign Up</Link>
        </li>
        <li className="header-menu-item">
          <Link to="/login">Log In</Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="header-menu">
      <li className="header-menu-item">
        <Link to="/">Home</Link>
      </li>
      <li className="header-menu-item">
        <Link onClick={logOut} to="/logout">Log Out</Link>
      </li>
    </ul>
  );
}

const Header = props => (
  <header>
    { guestLinks(props.user) }
  </header>
);

Header.defaultProps = {
  user: null,
};

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
