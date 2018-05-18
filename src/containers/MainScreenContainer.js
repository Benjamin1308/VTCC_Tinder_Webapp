import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import history from '../constants/history';
import FriendList from '../components/FriendList';
import Filter from '../components/Filter';
import Header from '../components/Header';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isFirstOpen: PropTypes.bool.isRequired,
};

const defaultProps = {};

class MainScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (this.props.isLoggedIn) {
      history.push(history.location.href);
      window.onpopstate = function () {
        history.go(1);
      };
    }
    const loginButton = !this.props.isLoggedIn ? (
      <Link to="/login">
        <button className="logIn2">Login to add more new friends!</button>
      </Link>
    ) : (
      <div />
    );
    if (this.props.isFirstOpen) {
      return <Redirect to="/" />;
    }
    return [
      <Header isLoggedIn={this.props.isLoggedIn} nav="/hotgirls" />,
      <div className="main-item">
        <Filter />
        <FriendList />
        {loginButton}
      </div>,
    ];
  }
}

MainScreenContainer.propTypes = propTypes;
MainScreenContainer.defaultProps = defaultProps;
const mapStateToProps = state => ({
  isLoggedIn: state.login.token !== '',
  isLoggingIn: state.login.isLoggingIn,
  isFirstOpen: !state.onboard,
});

export default connect(mapStateToProps, null)(MainScreenContainer);
