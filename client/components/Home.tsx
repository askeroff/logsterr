import * as React from 'react';
import { connect } from 'react-redux';
import Layout from './layout/Layout';
import Dashboard from './dashboard/Index';
import Spinner from './layout/Spinner';
import { IUser } from '../types';
import LandingPage from './LandingPage';

interface Props {
  user: IUser,
  history: any
}

class Home extends React.Component<Props, any> {
  static defaultProps = { history: {}, user: {} };

  shouldRender = () => {
    const hasHistory = Object.prototype.hasOwnProperty.call(
      this.props.history,
      'push'
    );
    if (this.props.user.loggedIn) {
      return (
        <Layout showToGuests>
          <Dashboard />
        </Layout>
      );
    } else if (this.props.user.loggedIn === false && hasHistory) {
      return (
        <Layout showToGuests contentClass="landing-wrapper">
          <LandingPage />
        </Layout>
      );
    }
    return (
      <Layout showToGuests>
        <Spinner />
      </Layout>
    );
  };

  render() {
    return this.shouldRender();
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
