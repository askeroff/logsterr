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
      todaydata: [],
      formattedData: [],
      currentlyShows: 'week',
    };
    this.formatData = this.formatData.bind(this);
    this.getProjectName = this.getProjectName.bind(this);
    this.changeData = this.changeData.bind(this);
  }

  componentDidMount() {
    this.props.handleMonthData();
    this.props.handleProjects(this.props.user._id);
  }

  componentWillReceiveProps(nextProps) {
    const weekdata = this.getLastWeekData(nextProps.dashboardData);
    const todaydata = this.getTodayData(nextProps.dashboardData);
    this.setState({ weekdata, todaydata });
    const formattedData = this.formatData(weekdata);
    this.setState({ formattedData });
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

  getTodayData(arr) {
    const today = new Date();
    const filtered = arr.filter(item => {
      const date = new Date(item.started);
      if (moment(date).isSame(today, 'day')) {
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

  formatData(arr) {
    const newObj = {};

    arr.forEach(item => {
      if (newObj[item.project] === undefined) {
        newObj[item.project] = { time: 0, id: 0 };
        newObj[item.project][item.task] = { taskName: '', time: 0, id: 0 };
        newObj[item.project].time += item.seconds;
        newObj[item.project].id = item.project;
        newObj[item.project][item.task].taskName = item.name;
        newObj[item.project][item.task].id = item.task;
        newObj[item.project][item.task].time += item.seconds;
      } else {
        newObj[item.project].time += item.seconds;
        if (newObj[item.project][item.task] === undefined) {
          newObj[item.project][item.task] = { taskName: '', time: 0, id: 0 };
          newObj[item.project][item.task].taskName = item.name;
          newObj[item.project][item.task].id = item.task;
          newObj[item.project][item.task].time += item.seconds;
        } else {
          newObj[item.project][item.task].time += item.seconds;
        }
      }
    });

    return Object.values(newObj);
  }

  changeData() {
    switch (this.state.currentlyShows) {
      case 'week': {
        const formattedData = this.formatData(this.state.todaydata);
        this.setState({ formattedData, currentlyShows: 'day' });
        break;
      }
      case 'day': {
        const formattedData = this.formatData(this.state.weekdata);
        this.setState({ formattedData, currentlyShows: 'week' });
        break;
      }
      default:
        return null;
    }
    return 0;
  }

  renderTasks(arr) {
    return arr.map(item => {
      if (item instanceof Object && item.constructor === Object) {
        return (
          <p className="dashboard-item-task" key={item.id}>
            <span>
              <strong>{item.taskName}: </strong>
              <span>{formatTime(item.time)}</span>
            </span>
          </p>
        );
      }
      return null;
    });
  }

  render() {
    let lastWeekData = null;
    const { formattedData, currentlyShows } = this.state;
    const title = currentlyShows === 'day' ? 'Today' : 'Last Week';
    if (this.props.projects.length !== 0 && formattedData.length !== 0) {
      lastWeekData = formattedData.map(item => (
        <div className="dashboard-item" key={item.id}>
          <h3 className="dashboard-item-title">
            {this.getProjectName(item.id)}: {formatTime(item.time)}
          </h3>
          <div className="dashboard-item-tasks">
            {this.renderTasks(Object.values(item))}
          </div>
        </div>
      ));
    }
    return (
      <div>
        <h2 className="dashboard-title">
          {title}
          <button onClick={this.changeData}>Change Me</button>
        </h2>
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
