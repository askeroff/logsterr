import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getMonthData } from '../../actions/dashboard';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdata: [],
    };
  }

  componentDidMount() {
    this.props.handleMonthData();
  }

  componentWillReceiveProps(nextProps) {
    const weekdata = this.getLastWeekData(nextProps.dashboardData);
    this.setState({ weekdata });
  }

  getLastWeekData(arr) {
    const lastSunday = moment().isoWeekday(0)._d;
    const lastMonday = moment().isoWeekday(-6)._d;

    const filtered = arr.filter(item => {
      const date = new Date(item.started);
      if (moment(date).isBetween(lastMonday, lastSunday, 'day', '[]')) {
        return item;
      }
      return false;
    });
    return filtered;
  }

  render() {
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
