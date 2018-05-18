import { SET_FILTER } from '../actions/actionTypes';

const filter = (state = 'NEW_FRIENDS', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default filter;
