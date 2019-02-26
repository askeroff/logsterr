// @flow
import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import type { Shows } from './Index';

type Props = {
  loadData: (start: any, end: any) => void,
  setDates: (start: any, end: any) => void,
  setDefaultShow: (str: Shows) => void,
  setFocusedInput: (input: any) => void,
  startDate: any,
  focusedInput: any,
  endDate: any,
  defaultShow: Shows
};

class DatePicker extends Component<Props, {}> {
  onDatesChange = ({ startDate, endDate }: any) => {
    this.props.loadData(
      startDate.startOf('day').valueOf(),
      endDate.endOf('day').valueOf()
    );
    this.props.setDates(startDate, endDate);
  };

  changeData = (event: any) => {
    this.props.setDefaultShow(event.target.value);
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
