import React from 'react';
import PropTypes from 'prop-types';
import Logout from '../Logout';
import Li from './ListItem';
import '../../styles/header.styl';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.guestLinks = this.guestLinks.bind(this);
  }

  guestLinks() {
    if (!this.props.user) {
      return (
        <ul className="header-menu">
          <Li myClassName="header-menu-item" url="/" linkText="Home" />
          <Li myClassName="header-menu-item" url="/signup" linkText="Sign Up" />
          <Li myClassName="header-menu-item" url="/login" linkText="Login" />
        </ul>
      );
    }
    return (
      <ul className="header-menu">
        <Li myClassName="header-menu-item" url="/" linkText="Home" />
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
