import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Layout from './Layout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    axios
    .get('/auth')
    .then((res) => {
      this.setState({
        user: res.data.user,
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Layout user={this.state.user} history={this.props.history}>
        <h1 className="page-title">TimeTracker</h1>
      </Layout>
    );
  }
}

App.defaultProps = {
  history: {},
};

App.propTypes = {
  history: PropTypes.object,
};

export default App;
