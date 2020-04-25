
import * as React from 'react';
import * as moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Shows } from './Index';

interface Props {
  loadData: (start: any, end: any) => void;
  setDates: (start: any, end: any) => void;
  setDefaultShow: (str: Shows) => void;
  setFocusedInput: (input: any) => void;
  startDate: any;
  focusedInput: any;
  endDate: any;
  defaultShow: Shows;
}

class DatePicker extends React.Component<Props, {}> {
  onDatesChange = ({ startDate, endDate }: any) => {
    this.props.loadData(startDate, endDate);
    this.props.setDates(startDate, endDate);
  };

  changeData = (event: any) => {
    this.props.setDefaultShow(event.target.value);
    switch (event.target.value) {
    case 'lastweek': {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const lastSunday = moment().isoWeekday(0)._d;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const thisMonday = moment().isoWeekday(1)._d;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
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

  render(): JSX.Element {
    return (
      <React.Fragment>
        <select
          className="dashboard__select"
          onChange={this.changeData}
          value={this.props.defaultShow}
        >
          <option value="lastweek">Last Week</option>
          <option value="thisweek">This Week</option>
          <option value="today">Today</option>
          <option value="month">This Month</option>
        </select>
        <DateRangePicker
          startDate={this.props.startDate}
          displayFormat="DD/MM/YYYY"
          startDateId="your_unique_start_date_id"
          endDate={this.props.endDate}
          endDateId="your_unique_end_date_id"
          onDatesChange={this.onDatesChange}
          firstDayOfWeek={1}
          minimumNights={0}
          isOutsideRange={() => false}
          focusedInput={this.props.focusedInput}
          onFocusChange={focusedInput =>
            this.props.setFocusedInput(focusedInput)
          }
        />
      </React.Fragment>
    );
  }
}

export default DatePicker;
