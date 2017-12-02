import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import TimelogItem from './TimelogItem';
import { getLogs } from '../actions/timelog';

class Timelog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.props.handleGetLogs();
  }

  render() {
    const logs = this.props.timelogs.map(item => (
      <TimelogItem
        key={item._id}
        name={item.name}
        seconds={item.seconds}
        started={item.started}
      />
    ));

    return (
      <Layout>
        <h1 className="page-title">History of your logged time</h1>
        <ul>{logs}</ul>
      </Layout>
    );
  }
}

Timelog.defaultProps = {
  timelogs: [],
};

Timelog.propTypes = {
  handleGetLogs: PropTypes.func.isRequired,
  timelogs: PropTypes.array,
};

const mapStateToProps = state => ({
  timelogs: state.timelog,
});

const mapDispatchToProps = dispatch => ({
  handleGetLogs() {
    dispatch(getLogs());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timelog);
