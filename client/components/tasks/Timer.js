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
    this.incrementSeconds = this.incrementSeconds.bind(this);
    this.timer = null;
  }

  incrementSeconds() {
    this.setState({
      seconds: this.state.seconds + 1,
    });
  }

  handleStart() {
    this.setState({ started: true });
    this.incrementSeconds(); // fixes one second delay when first called
    this.timer = setInterval(this.incrementSeconds, 1000);
  }

  handleStop() {
    clearInterval(this.timer);
    const data = {
      seconds: this.state.seconds,
      name: this.props.taskName,
      task: this.props.id,
      done: true,
      project: this.props.project,
    };
    this.props.handleAddingTimeLog(data, this.state.seconds);
    this.setState({ started: false, seconds: 0 });
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
      <div className="timer-block">
        <button onClick={this.handleButton} className="timer-block__button">
          {buttonString}
        </button>
        {this.state.started ? <span className="timer-item">{time}</span> : null}
      </div>
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
