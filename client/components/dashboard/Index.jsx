// @flow
import React from 'react';
import { connect } from 'react-redux';
import Tasks from './Tasks';
import Spinner from '../layout/Spinner';
import { getDashboardData } from '../../actions/dashboard';
import { getProjects } from '../../actions/projects';
import { formatTime } from '../../helpers';
import { IProject, IUser } from '../../types';

type Props = {
  handleDashboardData: () => void,
  handleProjects: (userid: string) => void,
  dashboardData: any,
  projects: IProject[],
  user: IUser
};
type State = {
  defaultShow: 'lastweek' | 'today' | 'month' | 'thisweek',
  title: string,
  dashboard: [],
  spinner: boolean
};

class Dashboard extends React.Component<Props, State> {
  static defaultProps = {
    dashboardData: {},
    projects: []
  };
  state = {
    defaultShow: 'lastweek',
    title: 'Last Week',
    dashboard: [],
    spinner: true
  };

  componentDidMount() {
    this.props.handleDashboardData();
    if (this.props.user.loggedIn) {
      this.props.handleProjects(this.props.user._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboardData.lastWeek) {
      this.setState({
        dashboard: nextProps.dashboardData.lastWeek,
        spinner: false
      });
    }
  }

  getProjectName = id => {
    let result;
    this.props.projects.forEach(item => {
      if (item._id === id) {
        result = item.name;
      }
    });
    return result || 'Not Found';
  };

  changeData = event => {
    const { dashboardData } = this.props;
    this.setState({ defaultShow: event.target.value });
    switch (event.target.value) {
      case 'lastweek': {
        this.setState({
          dashboard: dashboardData.lastWeek,
          title: 'Last Week'
        });
        break;
      }
      case 'today': {
        this.setState({
          dashboard: dashboardData.today,
          title: 'Today'
        });
        break;
      }
      case 'month': {
        this.setState({
          dashboard: dashboardData.month,
          title: 'This Month'
        });
        break;
      }
      case 'thisweek': {
        this.setState({
          dashboard: dashboardData.thisWeek,
          title: 'This Week'
        });
        break;
      }
      default:
        return null;
    }
    return 0;
  };

  render() {
    let showData = null;
    const { dashboard } = this.state;
    if (this.state.spinner) {
      return <Spinner />;
    }
    if (this.props.projects.length !== 0 && dashboard.length !== 0) {
      showData = dashboard.map(item => (
        <div className="dashboard__item" key={item.id}>
          <h3 className="dashboard__item-title">
            {this.getProjectName(item.id)}: {formatTime(item.time)}
          </h3>
          <div className="dashboard__item-tasks">
            <Tasks tasks={Object.values(item)} />
          </div>
        </div>
      ));
    } else {
      showData = <p>No data yet. Start Tracking </p>;
    }

    return (
      <div className="dashboard">
        <h2 className="dashboard__title">
          Data For
          <select
            className="dashboard__select"
            onChange={this.changeData}
            value={this.state.defaultShow}
          >
            <option value="lastweek">Last Week</option>
            <option value="thisweek">This Week</option>
            <option value="today">Today</option>
            <option value="month">This Month</option>
          </select>
        </h2>
        {showData}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboardData: state.dashboard,
  projects: state.projects,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  handleDashboardData() {
    dispatch(getDashboardData());
  },
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
