import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getMonthData } from '../../actions/dashboard';
import { getProjects } from '../../actions/projects';
import { formatTime } from '../../helpers';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weekdata: [],
      data: [],
    };
    this.formatWeekData = this.formatWeekData.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
  }

  componentDidMount() {
    this.props.handleMonthData();
    this.props.handleProjects(this.props.user._id);
  }

  componentWillReceiveProps(nextProps) {
    const weekdata = this.getLastWeekData(nextProps.dashboardData);
    this.setState({ weekdata });
    this.formatWeekData(weekdata);
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
  getProjectName(id) {
    let result;
    this.props.projects.forEach(item => {
      if (item._id === id) {
        result = item.name;
      }
    });
    return result || 'Not Found';
  }

  formatWeekData(arr) {
    const newObj = {};

    arr.forEach(item => {
      if (newObj[item.project] === undefined) {
        newObj[item.project] = { time: 0, name: '', id: 0 };
        newObj[item.project].time += item.seconds;
        newObj[item.project].id = item.project;
      } else {
        newObj[item.project].time += item.seconds;
      }
    });

    this.setState({ data: Object.values(newObj) });
  }

  render() {
    let lastWeekData = null;
    const { data } = this.state;
    if (this.props.projects.length !== 0 && data.length !== 0) {
      lastWeekData = data.map(item => (
        <div key={item.id}>
          <span>
            Time spent on <strong>{this.getProjectName(item.id)}</strong>:{' '}
            {formatTime(item.time)}
          </span>
        </div>
      ));
    }
    return (
      <div>
        <h2>Last Week</h2>
        {lastWeekData}
      </div>
    );
  }
}

Dashboard.defaultProps = {
  dashboardData: [],
  projects: [],
};

Dashboard.propTypes = {
  handleMonthData: PropTypes.func.isRequired,
  handleProjects: PropTypes.func.isRequired,
  dashboardData: PropTypes.array,
  projects: PropTypes.array,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dashboardData: state.dashboard,
  projects: state.projects,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleMonthData() {
    dispatch(getMonthData());
  },
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
