import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import NewTaskForm from './NewTaskForm';

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
    };
    this.handleTaskInput = this.handleTaskInput.bind(this);
  }

  handleTaskInput(event) {
    this.setState({ taskName: event.target.value });
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">New Task</h1>
        <p> Here you can add tasks for your selected project </p>

        <NewTaskForm
          inputValue={this.state.taskName}
          handleInput={this.handleTaskInput}
          labelName="Name Of Your New Task"
          parentProjectId={this.props.match.params.id}
        />
      </Layout>
    );
  }
}

NewTask.propTypes = {
  match: PropTypes.object.isRequired,
};

export default NewTask;
