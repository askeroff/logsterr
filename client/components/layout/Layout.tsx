import * as React from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedIn } from '../../actions/user';
import Header from './Header';
import Footer from './Footer';
import Spinner from './Spinner';
import ShowLostTime from './ShowLostTime';
import ShowMessages from './ShowMessages';
import { User } from '../../types';
import NotLoggedIn from '../NotLoggedIn';

interface Props {
  children: any | any[];
  user: User;
  contentClass: string;
  showToGuests: boolean;
  showSpinner: boolean;
  getUserData: () => void;
}

class Layout extends React.Component<Props> {
  componentDidMount(): void {
    if (this.props.user.loggedIn === undefined) {
      this.props.getUserData();
    }
  }

  getContent = (): JSX.Element | JSX.Element[] => {
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

  render(): JSX.Element | JSX.Element[] {
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
