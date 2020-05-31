
import * as React from 'react';
import * as Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from 'highcharts-react-official';
import { formatTime } from '../../helpers/';
import { getDrilldown, prepareData } from '../../helpers/chart';

interface Props {
  dashboard: {
    timestamp: number;
    data: Array<any>;
  };
}

interface State {
  options: any;
}

drilldown(Highcharts);

export default class Charts extends React.Component<Props, State> {
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
        formatter(): string {
          return `<strong>${formatTime(this.y * 3600)}</strong>`;
        }
      },
      ...prepareData(
        this.props.dashboard.data,
        getDrilldown(this.props.dashboard.data)
      )
    }
  };

  componentDidUpdate(prevProps): void {
    if (prevProps.dashboard.timestamp !== this.props.dashboard.timestamp) {
      const drilldownData = getDrilldown(this.props.dashboard.data);
      const prepared = prepareData(this.props.dashboard.data, drilldownData);
      this.setState(state => ({ options: { ...state.options, ...prepared } }));
    }
  }
  render(): JSX.Element {
    return (
      <React.Fragment>
        {/* <HighchartsReact highcharts={Highcharts} options={this.state.options} /> */}
        <span>text</span>
      </React.Fragment>
    );
  }
}

