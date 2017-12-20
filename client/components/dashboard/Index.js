import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMonthData } from '../../actions/dashboard';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.handleMonthData();
  }

  render() {
    return <h1> Dashboard Component </h1>;
  }
}

Dashboard.propTypes = {
  handleMonthData: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleMonthData() {
    dispatch(getMonthData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
