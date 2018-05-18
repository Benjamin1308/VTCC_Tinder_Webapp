import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Comment from './Comment';
import { requestHotgirlComments, stopRequestHotgirlComments } from '../actions/actionTypes';
import '../css/CommentView.css';

class CommentView extends React.Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      author: PropTypes.string,
      authorName: PropTypes.string,
      body: PropTypes.string,
    })).isRequired,
    hotgirlId: PropTypes.string.isRequired,
    requestHotgirlComments: PropTypes.func.isRequired,
    stopRequestHotgirlComments: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.commentsRef = firebase.database().ref(`comments/${this.props.hotgirlId}`);
    this.state = {
      comment: '',
    };
  }

  componentDidMount() {
    this.props.requestHotgirlComments(this.props.hotgirlId);
  }

  componentWillUnmount() {
    this.props.stopRequestHotgirlComments(this.props.hotgirlId);
  }
  handleCmt = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  handleCommentSubmit = () => {
    const { token, username } = this.props;
    this.commentsRef.push({ author: token, authorName: username, body: this.state.comment });
    this.setState({
      comment: '',
    });
  };

  render() {
    console.log(this.props.token);
    return (
      <div className="commentView">
        <div className="cmtList">
          {this.props.comments.map(comment => <Comment comment={comment} />)}
        </div>
        <div className="cmtInput">
          <input className="input-item" value={this.state.comment} onChange={this.handleCmt} />
          <button className="btn btn-info" onClick={this.handleCommentSubmit}>
            {' '}
            Comment
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.login.token,
  username: state.login.username,
  comments: state.comments,
});

const mapDispatchToProps = dispatch => ({
  requestHotgirlComments: id => dispatch(requestHotgirlComments(id)),
  stopRequestHotgirlComments: id => dispatch(stopRequestHotgirlComments(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);
