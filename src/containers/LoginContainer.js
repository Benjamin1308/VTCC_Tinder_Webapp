import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { passOnboard } from '../actions/actionTypes';

class LoginContainer extends React.Component {
  static propTypes = {
    skip: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSkip = () => {
    this.props.skip();
  };
  render() {
    return (
      <div className="login">
        <h2>New Friends!</h2>

        <button className="loginButton">
          <Link to="/login">Login with Facebook</Link>
        </button>

        <button className="skipButton" onClick={this.handleSkip}>
          <Link to="/main">Skip Login </Link>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  skip: () => {
    dispatch(passOnboard());
  },
});
const mapStateToProps = state => ({
  isLoggingIn: state.login.isLoggingIn,
  isLoggedIn: state.login.token !== '',
  onboard: state.onboard,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
