// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';

type State = {
  moveTime: boolean,
  deleteTime: boolean
};

class TimeAddOptions extends React.Component<{}, State> {
  state = {
    moveTime: true,
    deleteTime: false,
  };

  changeMoveTime = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      moveTime: e.currentTarget.checked,
    });
    swal.setActionValue({
      confirm: { options: [e.currentTarget.checked, this.state.deleteTime] },
    });
  };

  changeDeleteTime = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      deleteTime: e.currentTarget.checked,
    });
    swal.setActionValue({
      confirm: { options: [this.state.moveTime, e.currentTarget.checked] },
    });
  };

  render() {
    return (
      <div>
        <label>
          Add this task`s time to the new project
          <input
            type="checkbox"
            checked={this.state.moveTime}
            value={this.state.moveTime}
            onChange={this.changeMoveTime}
          />
        </label>
        <label>
          Subtract this task`s time from this project
          <input
            type="checkbox"
            checked={this.state.deleteTime}
            value={this.state.deleteTime}
            onChange={this.changeDeleteTime}
          />
        </label>
      </div>
    );
  }
}

const wrapper = document.createElement('div');
ReactDOM.render(<TimeAddOptions />, wrapper);

export default wrapper.firstChild;
