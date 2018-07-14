// @flow
import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import Tasks from './Tasks';
import Spinner from '../layout/Spinner';
import { getDashboardData } from '../../actions/dashboard';
import { getProjects } from '../../actions/projects';
import { formatTime } from '../../helpers';
import { IProject, IUser } from '../../types';

type Props = {
  handleDashboardData: (start: string, end: string) => void,
  handleProjects: (userid: string) => void,
  dashboardData: any,
  projects: IProject[],
  user: IUser
};
type State = {
  defaultShow: 'lastweek' | 'today' | 'month' | 'thisweek',
  title: string,
  dashboard: [],
  spinner: boolean,
  startDate: any,
  endDate: any,
  focusedInput: any
};

class Dashboard extends React.Component<Props, State> {
  static defaultProps = {
    dashboardData: {},
    projects: []
  };
  state = {
    defaultShow: 'today',
    title: 'Today',
    dashboard: [],
    spinner: true,
    startDate: moment(new Date()),
    endDate: moment(new Date()),
    focusedInput: null
  };

  componentDidMount() {
    const { startDate, endDate } = this.state;
    this.props.handleDashboardData(
      startDate.format('YYYY-MM-DD'),
      endDate.format('YYYY-MM-DD')
    );
    if (this.props.user.loggedIn) {
      this.props.handleProjects(this.props.user._id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboardData.data) {
      this.setState({
        dashboard: nextProps.dashboardData.data,
        spinner: false
      });
    }
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.handleDashboardData(
      startDate.format('YYYY-MM-DD'),
      endDate.format('YYYY-MM-DD')
    );
    return this.setState({ startDate, endDate });
  };

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
    this.setState({ defaultShow: event.target.value });
    switch (event.target.value) {
      case 'lastweek': {
        const lastSunday = moment().isoWeekday(0)._d;
        const lastMonday = moment().isoWeekday(-6)._d;
        this.onDatesChange({
          startDate: moment(lastMonday),
          endDate: moment(lastSunday)
        });
        break;
      }
      case 'today': {
        const today = moment(new Date());
        this.onDatesChange({ startDate: today, endDate: today });
        break;
      }
      case 'month': {
        this.onDatesChange({
          startDate: moment().startOf('month'),
          endDate: moment().endOf('month')
        });
        break;
      }
      case 'thisweek': {
        const thisMonday = moment().isoWeekday(1)._d;
        const thisSunday = moment().isoWeekday(7)._d;

        this.onDatesChange({
          startDate: moment(thisMonday),
          endDate: moment(thisSunday)
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
        <div className="dashboard__header">
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

          <DateRangePicker
            startDate={this.state.startDate}
            displayFormat="DD/MM/YYYY"
            startDateId="your_unique_start_date_id"
            endDate={this.state.endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={this.onDatesChange}
            firstDayOfWeek={1}
            isOutsideRange={() => false}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
          />
        </div>
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
  handleDashboardData(start, end) {
    dispatch(getDashboardData(start, end));
  },
  handleProjects(authorID) {
    dispatch(getProjects(authorID));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
