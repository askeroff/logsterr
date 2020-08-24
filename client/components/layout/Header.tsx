import * as React from 'react';
import Li from './ListItem';

interface Props {
  userEmail: string;
}

class Header extends React.Component<Props> {
  guestLinks = (): JSX.Element => {
    if (!this.props.userEmail) {
      return (
        <ul className="nav">
          <Li myClassName="nav__item" url="/" linkText="Home" />
          <Li myClassName="nav__item" url="/signup" linkText="Sign Up" />
          <Li myClassName="nav__item" url="/login" linkText="Login" />
        </ul>
      );
    }
    return (
      <ul className="nav">
        <Li myClassName="nav__item" url="/" linkText="Dashboard" />
        <Li myClassName="nav__item" url="/projects" linkText="Projects" />
        <Li myClassName="nav__item" url="/timelog/1" linkText="Timelog" />
        <Li myClassName="nav__item" url="/settings" linkText="Settings" />
        <Li myClassName="nav__item" url="/logmeout" linkText="Log Out" />
        <li className="nav__item">
          <span className="nav__user">
            (You are logged in as {this.props.userEmail})
          </span>
        </li>
      </ul>
    );
  };

  render(): JSX.Element {
    return (
      <header className="header">
        <div className="content-wrapper">{this.guestLinks()}</div>
      </header>
    );
  }
}

export default Header;
