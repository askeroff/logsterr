import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

class TimeAddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: '00',
      hours: '00',
    };
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleMinutesChange(e) {
    this.setState({
      minutes: e.target.value,
    });
  }

  handleHoursChange(e) {
    this.setState({
      hours: e.target.value,
    });
  }

  isNumber(n) {
    return !isNaN(n);
  }

  handleSubmit() {
    const { hours, minutes } = this.state;
    const { task, name, project, addTime } = this.props;

    if (!this.isNumber(hours) || !this.isNumber(minutes)) {
      swal('Invalid', 'Provide only numbers', 'error');
      return null;
    }

    const hoursToSeconds = hours * 3600;
    const minutesToSeconds = minutes * 60;
    const result = hoursToSeconds + minutesToSeconds;
    const data = {
      seconds: result,
      done: true,
      name,
      task,
      project,
    };
    addTime(data, result);
    swal('Wohoo!', 'Time has been added to your timelog', 'success');
    return result;
  }

  render() {
    return (
      <div className="timer--addTimeForm">
        <label htmlFor="hours">HH</label>
        <input
          onChange={this.handleHoursChange}
          name="hours"
          type="text"
          className="timer--input"
          value={this.state.hours}
        />
        <label htmlFor="minutes">MM</label>
        <input
          onChange={this.handleMinutesChange}
          name="minutes"
          type="text"
          className="timer--input"
          value={this.state.minutes}
        />
        <input
          type="button"
          onClick={this.handleSubmit}
          className="timer--button"
          value="Ok"
        />
      </div>
    );
  }
}

TimeAddForm.propTypes = {
  task: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  addTime: PropTypes.func.isRequired,
};

export default TimeAddForm;
