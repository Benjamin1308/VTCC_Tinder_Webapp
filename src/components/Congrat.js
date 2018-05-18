import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';

class App extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
    };
  }

  componentDidAppear() {}

  render() {
    if (this.state.visible) {
      return (
        <div>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnter={false}
            transitionLeave={false}
          >
            <img className="congrat" src="congratulation.png" alt="congratulation" />
          </ReactCSSTransitionGroup>
        </div>
      );
    }
    return <div />;
  }
}
export default App;
