import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logout from './Logout';
import '../styles/header.styl';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.guestLinks = this.guestLinks.bind(this);
  }

  guestLinks() {
    if (!this.props.user) {
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
        <Logout history={this.props.history} />
      </ul>
    );
  }

  render() {
    return (
      <header>
        { this.guestLinks() }
      </header>
    );
  }
}

Header.defaultProps = {
  user: null,
  history: {},
};

Header.propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
};

export default Header;
