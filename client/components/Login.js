import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logIn } from '../actions/user';
import LoginForm from './layout/LoginForm';
import Layout from './layout/Layout';
import Spinner from './layout/Spinner';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      spinner: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.user.error = '';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email !== undefined) {
      this.props.history.push('/');
    }

    if (nextProps.error !== '' && nextProps.error !== undefined) {
      this.setState({ spinner: false });
      this.resultMessage.innerHTML = nextProps.error;
    }
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });
    this.resultMessage.innerHTML = '';
    this.props.handleLogin({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    return (
      <Layout>
        <h1 className="page-title">Login Page</h1>
        <LoginForm
          myClassName="form__login"
          handleSubmit={this.handleSubmit}
          emailValue={this.state.email}
          passwordValue={this.state.password}
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
        />
        <div
          className="server-response"
          ref={resultMessage => {
            this.resultMessage = resultMessage;
          }}
        />
        {this.state.spinner ? <Spinner /> : null}
      </Layout>
    );
  }
}

Login.defaultProps = {
  error: '',
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  handleLogin(user) {
    dispatch(logIn(user));
  },
});

export const UnwrappedLogin = Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
