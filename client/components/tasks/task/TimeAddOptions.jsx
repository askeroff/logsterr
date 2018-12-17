// @flow
import React from 'react';

type State = {
  moveTime: boolean,
  deleteTime: boolean
};

type Props = {
  setMoveRef: any,
  setDeleteRef: any,
}

class TimeAddOptions extends React.Component<Props, State> {
  state = {
    moveTime: true,
    deleteTime: false
  };

  changeMoveTime = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      moveTime: e.currentTarget.checked
    });
  };

  changeDeleteTime = (e: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      deleteTime: e.currentTarget.checked
    });
  };

  render() {
    return (
      <div className="timeoptions">
        <label>
          Add this task`s time to the new project
          <input
            type="checkbox"
            ref={this.props.setMoveRef}
            checked={this.state.moveTime}
            value={this.state.moveTime}
            onChange={this.changeMoveTime}
          />
        </label>
        <label>
          Subtract this task`s time from this project
          <input
            type="checkbox"
            ref={this.props.setDeleteRef}
            checked={this.state.deleteTime}
            value={this.state.deleteTime}
            onChange={this.changeDeleteTime}
          />
        </label>
      </div>
    );
  }
}

export default TimeAddOptions;
