import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ActivityIndicator from 'react-activity-indicator';
import 'react-activity-indicator/src/activityindicator.css';
import { requestFetchHotgirls, stopRequestHotgirls, removeHotgirl } from '../actions/actionTypes';
import HotgirlCard from '../components/HotgirlCard';
import Header from '../components/Header';

class HotgirlsScreen extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    hotgirls: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      picture: PropTypes.string,
      hearts: PropTypes.number,
      description: PropTypes.string,
    })).isRequired,
    requestFetchHotgirls: PropTypes.func.isRequired,
    stopRequestHotgirls: PropTypes.func.isRequired,
    removeHotgirl: PropTypes.func.isRequired,
    isFirstOpen: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDate: false,
    };
  }
  componentDidMount() {
    this.props.requestFetchHotgirls();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hotgirls.length === 0) {
      this.props.requestFetchHotgirls();
    }
  }
  shouldComponentUpdate(nextProps) {
    return this.props.hotgirls !== nextProps.hotgirls;
  }
  componentWillUnmount() {
    this.props.stopRequestHotgirls();
  }

  handleDate = (id) => {
    const { uid } = firebase.auth().currentUser || { uid: 'notloggedin' };
    this.setState({
      isDate: true,
    });

    firebase
      .database()
      .ref(`dates/${uid}/${id}`)
      .set(true)
      .then(() => {
        this.props.removeHotgirl(id);
      });
  };

  handleLove = (id) => {
    const hotgirlRef = firebase.database().ref(`hotgirls/${id}`);
    hotgirlRef.transaction(hotgirl => ({ ...hotgirl, hearts: hotgirl.hearts + 1 })).then(() => {
      this.props.removeHotgirl(id);
    });
  };

  handleDiscard = (id) => {
    this.props.removeHotgirl(id);
  };

  render() {
    if (this.props.isFirstOpen) {
      return <Redirect to="/" />;
    }
    if (!this.props.isFetching) {
      return [
        <Header isLoggedIn nav="/main" />,
        <div>
          {this.props.hotgirls
            .slice(0, 1)
            .map(item => (
              <HotgirlCard
                hotgirl={this.props.hotgirls[0]}
                onDateClick={id => this.handleDate(id)}
                onLoveClick={id => this.handleLove(id)}
                onDiscardClick={id => this.handleDiscard(id)}
                key={item.id}
                isDate={this.state.isDate}
              />
            ))}
        </div>,
      ];
    }
    return [
      <Header isLoggedIn />,
      <ActivityIndicator
        className="loading"
        number={3}
        diameter={40}
        borderWidth={1}
        duration={300}
        activeColor="#66D9EF"
        borderColor="white"
        borderRadius="50%"
      />,
    ];
  }
}

const mapStateToProps = state => ({
  isFetching: state.hotgirls.isFetching,
  hotgirls: state.hotgirls.hotgirls,
  isFirstOpen: !state.onboard,
});

const mapDispatchToProps = dispatch => ({
  requestFetchHotgirls: () => dispatch(requestFetchHotgirls()),
  stopRequestHotgirls: () => dispatch(stopRequestHotgirls()),
  removeHotgirl: id => dispatch(removeHotgirl(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotgirlsScreen);
