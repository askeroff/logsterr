
import React, { Component } from 'react';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from 'highcharts-react-official';
import { formatTime } from '../../helpers';
import { getDrilldown, prepareData } from '../../helpers/chart';

interface Props {
  dashboard: {
    timestamp: number,
    data: Array<mixed>
  }
}

type State = {
  options: any
};

drilldown(Highcharts);

class Charts extends Component<Props, State> {
  state = {
    options: {
      chart: {
        type: 'column'
      },
      yAxis: {
        title: {
          text: 'Hours'
        }
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Dashboard data'
      },
      tooltip: {
        formatter() {
          return `<strong>${formatTime(this.y * 3600)}</strong>`;
        }
      },
      ...prepareData(
        this.props.dashboard.data,
        getDrilldown(this.props.dashboard.data)
      )
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.dashboard.timestamp !== this.props.dashboard.timestamp) {
      const drilldownData = getDrilldown(this.props.dashboard.data);
      const prepared = prepareData(this.props.dashboard.data, drilldownData);
      this.setState(state => ({ options: { ...state.options, ...prepared } }));
    }
  }
  render() {
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={this.state.options} />
      </div>
    );
  }
}

export default Charts;
