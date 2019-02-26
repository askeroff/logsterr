// @flow
import React from 'react';
import { connect } from 'react-redux';
import { saveSettings } from '../actions/user';
import Layout from './layout/Layout';

class Settings extends React.Component<Props> {
  state = {
    hour: +this.props.user.startsDay || 0
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.startsDay !== this.props.user.startsDay) {
      this.setState({ hour: this.props.user.startsDay });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit({ startsDay: this.state.hour });
  };

  handleChange = e => {
    this.setState({ hour: +e.target.value });
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
        onChange={this.handleChange}
      >
        {options}
      </select>
    );
  };

  render() {
    return (
      <Layout>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Start of the day</legend>
            {this.selectView()}
          </fieldset>
          <label htmlFor="submit">
            <button className="button--submit" type="submit">
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
