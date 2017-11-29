import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
    };
  }
  render() {
    return (
      <li className="projects-list-item timer-item">
        {' '}
        Supposedly here will be the timer{' '}
      </li>
    );
  }
}

export default Timer;
