
import * as React from 'react';
import { connect } from 'react-redux';
import { saveSettings } from '../actions/user';
import Layout from './layout/Layout';

class Settings extends React.Component<Props> {
  state = {
    hour: +this.props.user.startsDay || 0,
    oldPassword: '',
    newPassword: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.startsDay !== this.props.user.startsDay) {
      this.setState({ hour: this.props.user.startsDay });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit({
      startsDay: this.state.hour,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    });
  };

  handleSelectChange = e => {
    this.setState({ hour: +e.target.value });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectView = () => {
    const options = [];
    for (let i = 0; i <= 23; i += 1) {
      const val = i < 10 ? `0${i}` : i;
      options.push(<option value={i} key={i}>{`${val}:00`}</option>);
    }
    return (
      <select
        className="settings--select"
        value={this.state.hour}
        onChange={this.handleSelectChange}
      >
        {options}
      </select>
    );
  };

  render() {
    const labelStyle = { textAlign: 'left' };
    return (
      <Layout>
        <form className="settings" onSubmit={this.handleSubmit}>
          <fieldset className="settings--field">
            <legend className="settings--legend">Start of the day</legend>
            {this.selectView()}
          </fieldset>
          <fieldset className="settings--field">
            <legend className="settings--legend">Change Password</legend>
            <label style={labelStyle} htmlFor="oldPassword">
              Old Password
            </label>
            <input
              name="oldPassword"
              type="password"
              className="settings-input"
              onChange={this.handleChange}
              value={this.state.oldPassword}
            />

            <label style={labelStyle} htmlFor="newPassword">
              New Password
            </label>
            <input
              name="newPassword"
              type="password"
              className="settings-input"
              onChange={this.handleChange}
              value={this.state.newPassword}
            />
          </fieldset>

          <label style={labelStyle} htmlFor="submit">
            <button
              className="button--submit settings-submit"
              type="submit"
            >
              Save
            </button>
          </label>
        </form>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  handleSubmit(settings) {
    dispatch(saveSettings(settings));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
