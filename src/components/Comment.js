import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => {
  const { authorName, body } = comment;
  return (
    <div className="commentContainer">
      <h4 className="author">{authorName || 'anonymous'}</h4>
      <p className="comment">{body}</p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    authorName: PropTypes.string,
    author: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Comment;
