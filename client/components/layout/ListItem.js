import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Li = props => (
  <li className={props.myClassName}>
    <Link to={props.url}>{props.linkText}</Link>
  </li>
);

Li.defaultProps = {
  myClassName: '',
  url: '/',
  linkText: 'default text',
};

Li.propTypes = {
  myClassName: PropTypes.string,
  url: PropTypes.string,
  linkText: PropTypes.string,
};

export default Li;
