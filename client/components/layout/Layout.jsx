// @flow
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedIn } from '../../actions/user';
import Header from './Header';
import Footer from './Footer';
import Spinner from './Spinner';
import ShowLostTime from './ShowLostTime';
import ShowMessages from './ShowMessages';
import { IUser } from '../../types';
import NotLoggedIn from '../NotLoggedIn';

type Props = {
  children: any[],
  user: IUser,
  showToGuests: boolean,
  showSpinner: boolean,
  getUserData: () => void
};

class Layout extends React.Component<Props> {
  componentDidMount() {
    if (this.props.user.loggedIn === undefined) {
      this.props.getUserData();
    }
  }

  getContent = () => {
    if (this.props.showSpinner && this.props.user && this.props.user.loggedIn) {
      return <Spinner />;
    }
    if (
      (this.props.user && this.props.user.loggedIn) ||
      this.props.showToGuests
    ) {
      return this.props.children;
    }
    return <NotLoggedIn />;
  };

  render() {
    if (!Object.prototype.hasOwnProperty.call(this.props.user, 'loggedIn')) {
      return <Spinner />;
    }
    const contentClass = this.props.contentClass
      ? this.props.contentClass
      : 'content-wrapper';
    return (
      <div className="wrapper">
        <Header userEmail={this.props.user.email} />
        <div className={contentClass}>
          <div className="important-messages">
            <ShowLostTime />
            <ShowMessages />
          </div>
          {this.getContent()}
        </div>
        <ToastContainer />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getUserData() {
    dispatch(isLoggedIn());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
