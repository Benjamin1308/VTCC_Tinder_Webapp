import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ActivityIndicator from 'react-activity-indicator';
import 'react-activity-indicator/src/activityindicator.css';
import { requestLogin, passOnboard } from '../actions/actionTypes';
import '../css/LoginForm.css';

const propTypes = {
  logIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
};

const defaultProps = {};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUser = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePass = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handlelogIn = (e) => {
    e.preventDefault();
    if (this.state.title !== '' && this.state.content !== '') {
      this.props.logIn(this.state);
    }

    this.setState({
      title: '',
      content: '',
    });
  };
  render() {
    if (this.props.isLoggedIn) return <Redirect to="/main" />;
    const { username, password } = this.state;
    if (this.props.isLoggingIn) {
      return (
        <ActivityIndicator
          className="loading"
          number={3}
          diameter={40}
          borderWidth={1}
          duration={300}
          activeColor="#66D9EF"
          borderColor="white"
          borderRadius="50%"
        />
      );
    }
    return (
      <div className="loginPage">
        <h3 className="formTitle">Sign In</h3>
        <form className="loginForm">
          <div className="form-item">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={this.handleUser}
              id="username"
              placeholder="Username"
              className="input-item"
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={this.handlePass}
              type="password"
              id="password"
              placeholder="Password"
              className="input-item"
            />
          </div>

          <button className="btn btn-info" onClick={this.handlelogIn}>
            Log in
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;
const mapStateToProps = state => ({
  isLoggedIn: state.login.token !== '',
  isLoggingIn: state.login.isLoggingIn,
});
const mapDispatchToProps = dispatch => ({
  logIn: (state) => {
    dispatch(passOnboard());
    dispatch(requestLogin(state.username, state.password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
