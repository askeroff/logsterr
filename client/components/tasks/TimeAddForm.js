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
    const { task, name, project, addTime, formToggle } = this.props;

    if (!this.isNumber(hours) || !this.isNumber(minutes)) {
      swal('Invalid', 'Provide only numbers', 'error');
      return null;
    }

    const hoursToSeconds = hours * 3600;
    const minutesToSeconds = minutes * 60;
    const result = hoursToSeconds + minutesToSeconds;
    if (this.props.from === 'project') {
      addTime(project, result);
    } else {
      const data = {
        seconds: result,
        done: true,
        name,
        task,
        project,
      };
      addTime(data, result);
    }

    formToggle();
    swal('Wohoo!', 'Time has been added!', 'success');
    return result;
  }

  render() {
    const addClass =
      this.props.from === 'project' ? 'timer__addTimeForm-project' : '';
    return (
      <div className={`timer__addTimeForm ${addClass}`}>
        <label htmlFor="hours">HH</label>
        <input
          onChange={this.handleHoursChange}
          name="hours"
          type="text"
          className="timer__addTimeForm-input"
          value={this.state.hours}
        />
        <label htmlFor="minutes">MM</label>
        <input
          onChange={this.handleMinutesChange}
          name="minutes"
          type="text"
          className="timer__addTimeForm-input"
          value={this.state.minutes}
        />
        <input
          type="button"
          onClick={this.handleSubmit}
          className="timer__addTimeForm-submit"
          value="Ok"
        />
      </div>
    );
  }
}

TimeAddForm.defaultProps = {
  task: null,
  name: 'Not defined',
  from: 'task',
};

TimeAddForm.propTypes = {
  task: PropTypes.string,
  name: PropTypes.string,
  from: PropTypes.string,
  project: PropTypes.string.isRequired,
  addTime: PropTypes.func.isRequired,
  formToggle: PropTypes.func.isRequired,
};

export default TimeAddForm;
