// @flow
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { getDashboardData, fetchPosts } from '../../actions/dashboard';
import DatePicker from './DatePicker';
import RenderData from './RenderData';
import Charts from './Charts';

type Props = {
  handleDashboardData: (start: string, end: string) => void,
  dashboardData: any
};

export type Shows = 'lastweek' | 'today' | 'month' | 'thisweek';

type State = {
  dashboard: Array<mixed>,
  startDate: any,
  focusedInput: any,
  endDate: any,
  defaultShow: Shows
};

class Dashboard extends React.Component<Props, State> {
  static defaultProps = {
    dashboardData: {}
  };
  state = {
    dashboard: [],
    chartView: false,
    defaultShow: 'today',
    startDate: moment(new Date()).startOf('day'),
    endDate: moment(new Date()).endOf('day'),
    focusedInput: null
  };

  componentDidMount() {
    const { startDate, endDate } = this.state;
    this.props.handleDashboardData(startDate.valueOf(), endDate.valueOf());
  }

  componentDidUpdate({ dashboardData }: Props) {
    if (
      this.props.dashboardData.isFetching === false &&
      dashboardData.isFetching === true
    ) {
      this.setState({
        dashboard: this.props.dashboardData.prepared
      });
    }
  }

  setDates = (startDate, endDate) => {
    this.setState({
      startDate: moment(startDate).startOf('day'),
      endDate: moment(endDate).endOf('day')
    });
  };

  setDefaultShow = (str: Shows) => {
    this.setState({
      defaultShow: str
    });
  };

  setFocusedInput = (input: any) => {
    this.setState({ focusedInput: input });
  };

  toggleView = () => {
    this.setState(state => ({
      chartView: !state.chartView
    }));
  };

  getView = () => {
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

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__header">
          <button onClick={this.toggleView} className="dashboard__button">
            View Charts
          </button>
          <DatePicker
            setDates={this.setDates}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            setDefaultShow={this.setDefaultShow}
            defaultShow={this.state.defaultShow}
            focusedInput={this.state.focusedInput}
            setFocusedInput={this.setFocusedInput}
            loadData={this.props.handleDashboardData}
          />
        </div>
        {this.getView()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dashboardData: state.dashboard
});

const mapDispatchToProps = dispatch => ({
  handleDashboardData(start, end) {
    dispatch(fetchPosts());
    dispatch(getDashboardData(start, end));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
