import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  nav: PropTypes.string.isRequired,
};

const defaultProps = {};

export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className="header">
          <h3 className="title">New Friends!</h3>
          <Link to={this.props.nav}>
            <button />
          </Link>
        </div>
      );
    }
    return (
      <div className="header">
        <h3 className="title">New Friends!</h3>
      </div>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
