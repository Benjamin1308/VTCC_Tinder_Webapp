import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  friend: PropTypes.object.isRequired,
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
};

const defaultProps = {};

export default class FriendItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      id, avatar, name, description, isFriend,
    } = this.props.friend;
    return (
      <div className="friend-item">
        <img
          className="avatar"
          src={avatar || 'https://avatars1.githubusercontent.com/u/9919?s=200&v=4'}
          alt=""
        />
        <div className="info">
          <div>{name}</div>
          <div>{description || 'No description'} </div>
        </div>
        <button
          className={isFriend ? 'btn-danger' : 'btn-success'}
          onClick={() =>
            (isFriend ? this.props.removeFriend(id, name) : this.props.addFriend(id, name))
          }
        >
          {isFriend ? 'Unfriend' : 'Add friend'}
        </button>
      </div>
    );
  }
}

FriendItem.propTypes = propTypes;
FriendItem.defaultProps = defaultProps;
