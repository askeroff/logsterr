// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isLoggedIn } from '../../actions/user';
import Header from './Header';
import Footer from './Footer';
import Spinner from './Spinner';
import ShowLostTime from './ShowLostTime';
import ShowMessages from './ShowMessages';
import { IUser } from '../../types';

type Props = {
  children: any[],
  user: IUser,
  getUserData: () => void
};

class Layout extends React.Component<Props> {
  componentDidMount() {
    this.props.getUserData();
  }

  render() {
    if (!Object.prototype.hasOwnProperty.call(this.props.user, 'loggedIn')) {
      return <Spinner />;
    }
    return (
      <div className="wrapper">
        <Header userEmail={this.props.user.email} />
        <div className="content-wrapper">
          <div className="important-messages">
            <ShowLostTime />
            <ShowMessages />
          </div>
          {this.props.children}
        </div>
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
