import { ONBOARD } from '../actions/actionTypes';

const onboard = (state = false, action) => {
  switch (action.type) {
    case ONBOARD:
      return true;
    default:
      return state;
  }
};

export default onboard;
