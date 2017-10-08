import React from 'react';
import PropTypes from 'prop-types';
// import Logout from '../Logout';
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
        <Li myClassName="header-menu-item" url="/cats" linkText="Categories" />
        {/* <Logout history={this.props.history} /> */}
        <li className="header-menu-item">
          <span className="userInfo">
            (You are loged in as {/* this.props.user.email */})
          </span>
        </li>
      </ul>
    );
  }

  render() {
    return <header>{this.guestLinks()}</header>;
  }
}

Header.defaultProps = {
  user: null,
};

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
