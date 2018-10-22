
import { all, call, put, select, takeEvery, take, cancel, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  LOAD_BOOK_DATA,
  LOAD_BOOK_DATA_FROM_STORAGE,
  START_PERSIST_TIMER,
  STOP_PERSIST_TIMER,

  setBookData,
} from './actions';

import { fetchBookData } from './requests';

import Storage from '../../utils/storage';
import { getCriterionTTL } from '../../utils/ttl';
import { getExpiredBookIds, getNotExistBookIds } from './utils';


function* loadBookData (action) {
  // Step 1. Get exist book data
  // Step 2. Filter expired or not cached book data
  // Step 3. Fetch book data
  // Step 4. Set book data

  const criterionTTL = getCriterionTTL();
  const existBooks = yield select(state => state.books.books);

  const expiredBookIds = getExpiredBookIds(existBooks, criterionTTL);
  const notExistBookIds = getNotExistBookIds(action.payload.bookIds, existBooks, criterionTTL);

  const books = yield call(fetchBookData, [...expiredBookIds, ...notExistBookIds]);
  yield put(setBookData(books));
}


function* loadBookDataFromStorage () {
  // Step 1. Load book data from storage
  // Step 2. Set book data
  const books = Storage.load();
  yield put(setBookData(books));
}

function* timerTick () {
  const PERSIST_DELAY_MILLISECS = 1000 * 30;

  while (true) {
    yield call(delay, PERSIST_DELAY_MILLISECS);
    const books = yield select(state => state.books.books);
    Storage.save(books);
  }
}

export function* persistTimer () {
  // Step 1. Select book data in redux store.
  // Step 2. Save to storage.
  while(yield take(START_PERSIST_TIMER)) {
    const timer = yield fork(timerTick);
    yield take(STOP_PERSIST_TIMER);
    yield cancel(timer);
  }
}

export default function* bookRootSaga () {
  yield all([
    persistTimer(),
    takeEvery(LOAD_BOOK_DATA, loadBookData),
    takeEvery(LOAD_BOOK_DATA_FROM_STORAGE, loadBookDataFromStorage),
  ]);
}
