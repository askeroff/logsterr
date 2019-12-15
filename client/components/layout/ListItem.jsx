// @flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  myClassName: string,
  url: string,
  linkText: string,
  trigger?: () => void
};

const Li = (props: Props) => (
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
  trigger: () => {}
};

export default Li;
