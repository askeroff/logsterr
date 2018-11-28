// @flow
import React from 'react';
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import Dashboard from './dashboard/Index';
import Spinner from './layout/Spinner';
import { IUser } from '../types';

type Props = {
  user: IUser,
  history: any
};

class Home extends React.Component<Props> {
  static defaultProps = { history: {}, user: {} };

  shouldRender = () => {
    const hasHistory = Object.prototype.hasOwnProperty.call(
      this.props.history,
      'push'
    );
    if (this.props.user.loggedIn) {
      return <Dashboard />;
    } else if (this.props.user.loggedIn === false && hasHistory) {
      this.props.history.push('/login');
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
