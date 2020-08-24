
import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  myClassName: string;
  url: string;
  linkText: string;
  trigger?: () => void;
}

const Li = (props: Props): JSX.Element => (
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
  trigger: (): any => {}
};

export default Li;
