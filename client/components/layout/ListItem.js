import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Li = props => (
  <li className={props.myClassName}>
    <Link onClick={props.trigger} to={props.url}>
      {props.linkText}
    </Link>
  </li>
);

Li.defaultProps = {
  myClassName: '',
  url: '/',
  linkText: 'default text',
  trigger: null,
};

Li.propTypes = {
  myClassName: PropTypes.string,
  url: PropTypes.string,
  linkText: PropTypes.string,
  trigger: PropTypes.func,
};

export default Li;
