
import * as React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment-timezone';
import { getDashboardData, fetchPosts } from '../../actions/dashboard';
import DatePicker from './DatePicker';
import RenderData from './RenderData';
import Charts from './Charts';
import { User } from '../../types';

interface Props {
  handleDashboardData: (start: number, end: number) => void;
  dashboardData: any;
  user: User;
}

// export type Shows = 'lastweek' | 'today' | 'month' | 'thisweek';

export enum Shows {
  lastweek,
  today,
  month,
  thisweek
}

interface State {
  dashboard: Array<any>;
  startDate: any;
  focusedInput: any;
  endDate: any;
  chartView: boolean;
  defaultShow: Shows;
}

class Dashboard extends React.Component<Props, State> {
  static defaultProps = {
    dashboardData: {}
  };
  state = {
    dashboard: [],
    chartView: false,
    defaultShow: Shows.today,
    startDate: moment(new Date()),
    endDate: moment(new Date()),
    focusedInput: null
  };

  componentDidMount(): void {
    const { startDate, endDate } = this.state;
    this.loadData(startDate, endDate);
  }

  componentDidUpdate({ dashboardData }: Props): void {
    if (
      this.props.dashboardData.isFetching === false &&
      dashboardData.isFetching === true
    ) {
      this.setState({
        dashboard: this.props.dashboardData.prepared
      });
    }
  }

  setDates = (startDate, endDate): void => {
    this.setState({
      startDate: moment(startDate),
      endDate: moment(endDate)
    });
  };

  loadData = (startDate, endDate): void => {
    const hour = this.props.user.startsDay || 0;
    const start = moment(startDate).set({
      hour,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    if (moment(start).isAfter(new Date())) {
      start.subtract(1, 'days');
    }
    const end = moment(endDate)
      .add(1, 'days')
      .set({ hour, minute: 0, second: 0, millisecond: 0 });
    this.props.handleDashboardData(start.valueOf(), end.valueOf());
  };

  setDefaultShow = (str: Shows): void => {
    this.setState({
      defaultShow: str
    });
  };

  setFocusedInput = (input: any): void => {
    this.setState({ focusedInput: input });
  };

  toggleView = (): void => {
    this.setState(state => ({
      chartView: !state.chartView
    }));
  };

  getView = (): JSX.Element => {
    if (this.state.chartView) {
      return (
        <Charts
          dashboard={{
            data: this.state.dashboard,
            timestamp: Date.now()
          }}
        />
      );
    }
    return (
      <RenderData
        isFetching={this.props.dashboardData.isFetching}
        data={this.state.dashboard}
      />
    );
  };

  render(): JSX.Element {
    const buttonText = this.state.chartView ? 'Text' : 'Charts';
    return (
      <div className="dashboard">
        <div className="dashboard__header">
          <button onClick={this.toggleView} className="dashboard__button">
            {`View ${buttonText}`}
          </button>
          <DatePicker
            setDates={this.setDates}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            setDefaultShow={this.setDefaultShow}
            defaultShow={this.state.defaultShow}
            focusedInput={this.state.focusedInput}
            setFocusedInput={this.setFocusedInput}
            loadData={this.loadData}
          />
        </div>
        {this.getView()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboardData: state.dashboard,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  handleDashboardData(start, end): void {
    dispatch(fetchPosts());
    dispatch(getDashboardData(start, end));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
