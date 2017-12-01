import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      started: false,
    };
    this.handleButton = this.handleButton.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.timer = null;
  }

  formatTime(seconds) {
    // https://stackoverflow.com/a/25279340/4208724
    const date = new Date(null);
    date.setSeconds(seconds);
    const result = date.toISOString().substr(11, 8);
    return result;
  }

  handleStart() {
    this.setState({ started: true, seconds: 0 });
    this.timer = setInterval(
      () =>
        this.setState({
          seconds: this.state.seconds + 1,
        }),
      1000
    );
  }

  handleStop() {
    this.setState({ started: false });
    clearInterval(this.timer);
    const data = {
      seconds: this.state.seconds,
      name: this.props.taskName,
      task: this.props.id,
      done: true,
    };
    this.props.handleAddingTimeLog(data);
  }

  handleButton() {
    if (!this.state.started) {
      this.handleStart();
    } else {
      this.handleStop();
    }
  }
  render() {
    const buttonString = this.state.started ? 'stop' : 'start';
    const time = this.formatTime(this.state.seconds);
    return (
      <li className="projects-list-item timer-block">
        <input onClick={this.handleButton} type="button" value={buttonString} />
        {this.state.seconds > 0 ? (
          <span className="timer-item">{time}</span>
        ) : null}
      </li>
    );
  }
}

Timer.propTypes = {
  taskName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleAddingTimeLog: PropTypes.func.isRequired,
};

export default Timer;
