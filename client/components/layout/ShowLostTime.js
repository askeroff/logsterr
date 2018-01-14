import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import timestorage from '../scripts/timestorage';
import { formatTime } from '../../helpers';

class ShowLostTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'block',
    };
    this.close = this.close.bind(this);
  }
  close() {
    timestorage.reset();
    this.setState({
      show: 'none',
    });
  }
  render() {
    const getStorageData = timestorage.get();
    if (getStorageData !== null && getStorageData !== undefined) {
      const now = moment();
      const then = new Date(getStorageData.time);
      const diff = formatTime(now.diff(then, 'seconds'));

      return (
        <div style={{ display: this.state.show }} className="warning-message">
          <span>
            You started tracking time for{' '}
            <Link to={`/projects/${getStorageData.projectId}`}>
              this project
            </Link>{' '}
            but did not stop the timer. If you still need this time to be
            tracked, you can add it manually.
          </span>
          <p>
            <strong>Task:</strong> <em>{getStorageData.taskName}</em>
            <strong> — Time passed:</strong> <em>{diff}</em>
          </p>
          <input
            type="button"
            className="info-button"
            value="Dismiss!"
            onClick={this.close}
          />
        </div>
      );
    }
    return null;
  }
}

export default ShowLostTime;
