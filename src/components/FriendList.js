import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {
  requestFriends,
  requestMyFriends,
  stopRequestFriends,
  stopRequestMyFriends,
  requestLogin,
} from '../actions/actionTypes';
import FriendItem from './FriendItem';
import '../css/FriendList.css';

const propTypes = {
  friends: PropTypes.array.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  requestFriends: PropTypes.func.isRequired,
  requestMyFriends: PropTypes.func.isRequired,
  stopRequestFriends: PropTypes.func.isRequired,
  stopRequestMyFriends: PropTypes.func.isRequired,
};
const defaultProps = {};

class FriendList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.requestFriends();
    this.props.requestMyFriends();
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  componentWillUnmount() {
    this.props.stopRequestFriends();
    this.props.stopRequestMyFriends();
  }
  toastFriend = msg => toast(msg, { autoClose: 2000 });
  handleAddFriend = (id, name) => {
    if (!this.props.isLoggedIn) {
      confirmAlert({
        title: '',
        message: 'Ban can dang nhap de ket ban',
        buttons: [
          {
            label: 'Dang nhap',
            onClick: null,
          },
          {
            label: 'Luc khac',
            onClick: null,
          },
        ],
      });
    } else if (firebase.auth().currentUser) {
      const { uid } = firebase.auth().currentUser;
      firebase
        .database()
        .ref(`friends/${uid}/${id}`)
        .set(true)
        .then(() => {
          firebase
            .database()
            .ref(`friends/${id}/${uid}`)
            .set(true)
            .then(this.toastFriend(`Bạn đã kết bạn với ${name}`));
        });
    }
  };
  handleRemoveFriend = (id, name) => {
    if (firebase.auth().currentUser) {
      const { uid } = firebase.auth().currentUser;
      firebase
        .database()
        .ref(`friends/${uid}/${id}`)
        .set(null)
        .then(() => {
          firebase
            .database()
            .ref(`friends/${id}/${uid}`)
            .set(null)
            .then(this.toastFriend(`Bạn đã hủy kết bạn với ${name}`));
        });
    }
  };
  render() {
    return (
      <div className="friend-list">
        {this.props.friends.map(friend => (
          <FriendItem
            friend={friend}
            removeFriend={this.handleRemoveFriend}
            addFriend={this.handleAddFriend}
            key={friend.id}
          />
        ))}
        <ToastContainer />
      </div>
    );
  }
}

FriendList.propTypes = propTypes;
FriendList.defaultProps = defaultProps;

const getVisibleFriendsLogin = (filter, newFriends, myFriends) =>
  (filter === 'NEW_FRIENDS'
    ? newFriends.filter(friend => !myFriends.includes(friend.id) && friend.id !== firebase.auth().currentUser.uid)
    : newFriends.filter(friend => myFriends.includes(friend.id)));
const getVisibleFriends = (filter, newFriends) =>
  (filter === 'NEW_FRIENDS'
    ? newFriends.map(friend => Object.assign(friend, { isFriend: false }))
    : []);
const mapStateToProps = state => ({
  isLoggedIn: state.login.token !== '',
  friends:
    state.login.token !== ''
      ? getVisibleFriendsLogin(state.filter, state.friends.newFriends, state.friends.myFriends)
      : getVisibleFriends(state.filter, state.friends.newFriends),
});

const mapDispatchToProps = dispatch => ({
  requestFriends: () => dispatch(requestFriends()),
  requestMyFriends: () => dispatch(requestMyFriends()),
  stopRequestFriends: () => dispatch(stopRequestFriends()),
  stopRequestMyFriends: () => dispatch(stopRequestMyFriends()),
  requestLogin: () => dispatch(requestLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
