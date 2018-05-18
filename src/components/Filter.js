import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MY_FRIENDS, NEW_FRIENDS, setFilter } from '../actions/actionTypes';
import '../css/Filter.css';

const propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

const defaultProps = {};

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSetFilter = (mode) => {
    this.props.setFilter(mode);
  };
  render() {
    return (
      <div>
        <button
          className={this.props.filter === NEW_FRIENDS ? 'chosen' : 'new-friend'}
          onClick={() => this.handleSetFilter(NEW_FRIENDS)}
        >
          New Friends
        </button>
        <div className="bar" />
        <button
          className={this.props.filter === MY_FRIENDS ? 'chosen' : 'my-friend'}
          onClick={() => this.handleSetFilter(MY_FRIENDS)}
        >
          My Friends
        </button>
      </div>
    );
  }
}

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  setFilter: mode => dispatch(setFilter(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
