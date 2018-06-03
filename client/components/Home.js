// @flow
import React from 'react';
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import Dashboard from './dashboard/Index';
import Spinner from './layout/Spinner';
import { IUser } from '../types';

type State = { loggedIn: boolean };

type Props = {
  user: IUser,
  history: any
};

class Home extends React.Component<Props, State> {
  static defaultProps = { history: {} };
  state = {
    loggedIn: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.loggedIn === true) {
      this.setState({ loggedIn: true });
    } else if (
      nextProps.user.loggedIn === false &&
      Object.prototype.hasOwnProperty.call(nextProps.history, 'push')
    ) {
      nextProps.history.push('/login');
    }
  }

  shouldRender = () => {
    if (this.state.loggedIn) {
      return <Dashboard />;
    }
    return <Spinner />;
  };

  render() {
    return <Layout>{this.shouldRender()}</Layout>;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
