
import { takeEvery } from 'redux-saga';
import { all, call, put } from 'redux-saga/effects';

import { LOAD_SHOWS, setShows } from './actions';
import { fetchShows } from './requests';

function* loadShows () {
  const data = yield call(fetchShows);
  yield put(setShows(data));
}

export default function* showsRootSaga () {
  yield all([
    takeEvery(LOAD_SHOWS, loadShows)
  ])
}
