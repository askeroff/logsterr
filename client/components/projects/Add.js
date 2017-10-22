import React from 'react';
import Layout from '../layout/Layout';
import AddForm from './AddForm';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectInput: '',
    };
    this.handleProjectInputChange = this.handleProjectInputChange.bind(this);
  }

  handleProjectInputChange(event) {
    this.setState({ projectInput: event.target.value });
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">Add New Project</h1>
        <p> Here you can add projects. You may think of them as categories. </p>
        <p>
          For instance, you might want to learn French, then create a project
          with an appropiate name, add tasks withing that project and track how
          much time you spent on that.
        </p>
        <AddForm
          inputValue={this.state.projectInput}
          handleInput={this.handleProjectInputChange}
        />
      </Layout>
    );
  }
}

export default Add;
