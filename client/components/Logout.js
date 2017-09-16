import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    axios
    .get('/logout')
    .then(() => {
      this.props.history.push('/login');
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <li className="header-menu-item">
        <Link onClick={this.logOut} to="/logout">Log Out</Link>
      </li>
    );
  }

}

Logout.defaultProps = {
  history: {},
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;

