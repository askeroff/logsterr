import React from 'react';
import PropTypes from 'prop-types';
import Layout from './layout/Layout';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.props.pageLoad();
  }

  render() {
    return (
      <Layout user={this.state.user} history={this.props.history}>
        <h1 className="page-title">TimeTracker</h1>
      </Layout>
    );
  }
}

Home.defaultProps = {
  history: {},
};

Home.propTypes = {
  history: PropTypes.object,
};

export default Home;
