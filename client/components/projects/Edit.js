import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import EditForm from './EditForm';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
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
        <h1 className="page-title">Edit {this.props.match.params.project}</h1>
        <p>You can rename your project</p>
        <EditForm
          inputValue={this.state.projectInput}
          handleInput={this.handleProjectInputChange}
          projectId={this.props.match.params.id}
        />
      </Layout>
    );
  }
}

Edit.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Edit;
