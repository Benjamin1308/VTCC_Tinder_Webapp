import { all } from 'redux-saga/effects';
import watchLogin from './loginSagas';
import { watchFriends, watchMyFriends } from './friendsSagas';
import watchFetchHotgirls from './hotgirlsSagas';
import watchCommentsRequest from './commentSaga';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchFriends(),
    watchMyFriends(),
    watchFetchHotgirls(),
    watchCommentsRequest(),
  ]);
}
