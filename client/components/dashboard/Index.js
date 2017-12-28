import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tasks from './Tasks';
import { getDashboardData } from '../../actions/dashboard';
import { getProjects } from '../../actions/projects';
import { formatTime } from '../../helpers';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNext: 'week',
      dashboard: [],
    };
    this.getProjectName = this.getProjectName.bind(this);
    this.changeData = this.changeData.bind(this);
  }

  componentDidMount() {
    this.props.handleDashboardData();
    if (this.props.user.loggedIn) {
      this.props.handleProjects(this.props.user._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboardData.lastWeek) {
      this.setState({ dashboard: nextProps.dashboardData.lastWeek });
    }
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

  changeData() {
    const { dashboardData } = this.props;
    switch (this.state.showNext) {
      case 'day': {
        this.setState({
          dashboard: dashboardData.lastWeek,
          showNext: 'week',
        });
        break;
      }
      case 'week': {
        this.setState({
          dashboard: dashboardData.today,
          showNext: 'day',
        });
        break;
      }
      default:
        return null;
    }
    return 0;
  }

  render() {
    let showData = null;
    const { dashboard } = this.state;
    const title = this.state.showNext === 'day' ? 'Today' : 'Last Week';
    if (this.props.projects.length !== 0 && dashboard.length !== 0) {
      showData = dashboard.map(item => (
        <div className="dashboard-item" key={item.id}>
          <h3 className="dashboard-item-title">
            {this.getProjectName(item.id)}: {formatTime(item.time)}
          </h3>
          <div className="dashboard-item-tasks">
            <Tasks tasks={Object.values(item)} />
          </div>
        </div>
      ));
    }
    return (
      <div className="dashboard">
        <h2 className="dashboard-title">
          {title}
          <button className="dashboard-toggle" onClick={this.changeData}>
            Toggle
          </button>
        </h2>
        {showData}
      </div>
    );
  }
}

Dashboard.defaultProps = {
  dashboardData: {},
  projects: [],
};

Dashboard.propTypes = {
  handleDashboardData: PropTypes.func.isRequired,
  handleProjects: PropTypes.func.isRequired,
  dashboardData: PropTypes.object,
  projects: PropTypes.array,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dashboardData: state.dashboard,
  projects: state.projects,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  handleDashboardData() {
    dispatch(getDashboardData());
  },
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
