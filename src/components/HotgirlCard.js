import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../css/HotgirlCard.css';
import Congrat from '../components/Congrat';
import CommentView from './CommentView';

class HotgirlCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      commentEnabled: false,
    };
  }

  renderComments = (id) => {
    if (this.state.commentEnabled) {
      return (
        <ReactCSSTransitionGroup
          transitionName="comment"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}
        >
          <CommentView hotgirlId={id} />
        </ReactCSSTransitionGroup>
      );
    }
    return <div />;
  };
  render() {
    const {
      id, name, description, hearts, picture,
    } = this.props.hotgirl;
    const sectionStyle = {
      width: '100%',
      height: '500px',
      backgroundImage: `url(${picture})`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItem: 'center',
      backgroundSize: '400px',
      marginTop: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'black',
      border: 'none',
    };
    return (
      <div className="card" style={sectionStyle}>
        <div className="info">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className="footer-expand">
          <div className="footer">
            <button className="discard btn " onClick={() => this.props.onDiscardClick(id)} />
            <div className="wide-btn">
              <button className="date btn " onClick={() => this.props.onDateClick(id)}>
                Tôi Muốn
              </button>
              <button
                className="comment-btn btn"
                onClick={() => {
                  this.setState(prevState => ({
                    commentEnabled: !prevState.commentEnabled,
                  }));
                }}
              >
                Comment
              </button>
            </div>
            <button className="love btn" onClick={() => this.props.onLoveClick(id)} />
          </div>
          {this.renderComments(id)}
        </div>
        <Congrat visible={this.props.isDate} />
      </div>
    );
  }
}

HotgirlCard.propTypes = {
  hotgirl: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    picture: PropTypes.string,
    hearts: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  onDiscardClick: PropTypes.func.isRequired,
  onDateClick: PropTypes.func.isRequired,
  onLoveClick: PropTypes.func.isRequired,
  isDate: PropTypes.bool.isRequired,
};

export default HotgirlCard;
