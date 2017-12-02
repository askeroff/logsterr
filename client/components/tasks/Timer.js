import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { formatTime } from '../../helpers/';

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
      project: this.props.project,
    };
    this.props.handleAddingTimeLog(data);
    swal('Good job!', 'Time has been added to your timelog', 'success');
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
    const time = formatTime(this.state.seconds);
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
  project: PropTypes.string.isRequired,
  handleAddingTimeLog: PropTypes.func.isRequired,
};

export default Timer;
