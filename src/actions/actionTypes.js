export const ONBOARD = 'ONBOARD';
export const FRIENDS_REQUEST = 'FRIENDS_REQUEST';
export const MY_FRIENDS_REQUEST = 'MY_FRIENDS_REQUEST';
export const STOP_FRIENDS_REQUEST = 'STOP_FRIENDS_REQUEST';
export const STOP_MY_FRIENDS_REQUEST = 'STOP_MY_FRIENDS_REQUEST';
export const FRIEND_ADDED = 'FRIEND_ADDED';
export const FRIEND_CHANGED = 'FRIEND_CHANGED';
export const MY_FRIEND_ADDED = 'MY_FRIEND_ADDED';
export const MY_FRIEND_REMOVED = 'MY_FRIEND_REMOVED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SET_FILTER = 'SET_FILTER';
export const MY_FRIENDS = 'MY_FRIENDS';
export const NEW_FRIENDS = 'NEW_FRIENDS';

export const REQUEST_FETCH_HOTGIRLS = 'REQUEST_FETCH_HOTGIRLS';
export const STOP_REQUEST_HOTGIRLS = 'STOP_REQUEST_HOTGIRLS';
export const REMOVE_HOTGIRL = 'REMOVE_HOTGIRL';
export const HOTGIRL_CHANGED = 'HOTGIRL_CHANGED';
export const FETCH_HOTGIRLS_SUCCESS = 'FETCH_HOTGIRLS_SUCCESS';
export const FETCH_HOTGIRLS_FAIL = 'FETCH_HOTGIRLS_FAIl';
export const FETCH_HOTGIRLS_PENDING = 'FETCH_HOTGIRLS_PENDING';

export const REQUEST_HOTGIRL_COMMENTS = 'REQUEST_HOTGIRL_COMMENTS';
export const STOP_REQUEST_HOTGIRL_COMMENTS = 'STOP_REQUEST_HOTGIRL_COMMENTS';
export const NEW_COMMENT = 'NEW_COMMENT';

export const setFilter = mode => ({ type: SET_FILTER, payload: mode });

export const passOnboard = () => ({ type: ONBOARD });

export const requestLogin = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {
    email,
    password,
  },
});

export const loginPending = () => ({ type: LOGIN_PENDING });

export const loginSuccess = (token, username) => ({
  type: LOGIN_SUCCESS,
  payload: { token, username },
});

export const loginFail = errMsg => ({ type: LOGIN_FAIL, payload: errMsg });

export const requestFriends = () => ({ type: FRIENDS_REQUEST });

export const stopRequestFriends = () => ({ type: STOP_FRIENDS_REQUEST });

export const requestMyFriends = () => ({ type: MY_FRIENDS_REQUEST });

export const stopRequestMyFriends = () => ({ type: STOP_MY_FRIENDS_REQUEST });

export const stopRequestHotgirls = () => ({ type: STOP_REQUEST_HOTGIRLS });

export const requestFetchHotgirls = () => ({ type: REQUEST_FETCH_HOTGIRLS });

export const removeHotgirl = id => ({ type: REMOVE_HOTGIRL, payload: id });

export const requestHotgirlComments = id => ({ type: REQUEST_HOTGIRL_COMMENTS, payload: id });

export const stopRequestHotgirlComments = id => ({
  type: STOP_REQUEST_HOTGIRL_COMMENTS,
  payload: id,
});