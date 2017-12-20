import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMonthData } from '../../actions/dashboard';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: [],
    };
  }
  componentDidMount() {
    this.props.handleMonthData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dashboard: nextProps.dashboardData });
  }

  render() {
    console.log(this.state);
    return <h1> Dashboard Component </h1>;
  }
}

Dashboard.defaultProps = {
  dashboardData: [],
};

Dashboard.propTypes = {
  handleMonthData: PropTypes.func.isRequired,
  dashboardData: PropTypes.array,
};

const mapStateToProps = state => ({
  dashboardData: state.dashboard,
});

const mapDispatchToProps = dispatch => ({
  handleMonthData() {
    dispatch(getMonthData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
