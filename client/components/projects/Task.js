import React from 'react';
import PropTypes from 'prop-types';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editName: '',
      showInput: false,
    };
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleShowInput = this.handleShowInput.bind(this);
  }

  handleNameInput(e) {
    this.setState({ editName: e.target.value });
  }

  handleShowInput() {
    this.setState({
      showInput: !this.state.showInput,
    });
  }

  handleRenaming(id, name) {
    this.props.handleRename(id, name);
    this.setState({
      showInput: false,
    });
  }

  render() {
    const { editName, showInput } = this.state;
    const { id, handleDelete, name } = this.props;
    return (
      <li className="projects-list-item">
        {!this.state.showInput && name}
        {showInput ? (
          <input type="text" value={editName} onChange={this.handleNameInput} />
        ) : null}
        {showInput ? (
          <input
            onClick={() => this.handleRenaming(id, this.state.editName)}
            type="button"
            value="Ok"
            className="rename-button"
          />
        ) : null}

        {!showInput ? (
          <button onClick={this.handleShowInput}>Rename</button>
        ) : null}

        <button onClick={() => handleDelete(id)} className="delete sign">
          &#9746;
        </button>
      </li>
    );
  }
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Task;
