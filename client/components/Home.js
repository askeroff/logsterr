import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    this.props.pageLoad();
    console.log(this.state);
  }

  render() {
    return <h1 className="page-title">TimeTracker</h1>;
  }
}

Home.defaultProps = {
  history: {},
};

Home.propTypes = {
  history: PropTypes.object,
};

export default Home;
