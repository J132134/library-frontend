import { all } from 'redux-saga/effects';

import accountRootSaga from '../services/account/sagas';
import bookRootSaga from '../services/book/sagas';
import commonRootSaga from '../services/common/sagas';
import excelDownloadRootSaga from '../services/excelDownload/sagas';

import purchasedMainRootSaga from '../services/purchased/main/sagas';
import purchasedMainUnitRootSaga from '../services/purchased/mainUnit/sagas';
import purchasedSearchRootSaga from '../services/purchased/search/sagas';
import purchasedSearchUnitRootSaga from '../services/purchased/searchUnit/sagas';
import purchasedHiddenSaga from '../services/purchased/hidden/sagas';
import purchaseHiddenUnitRootSaga from '../services/purchased/hiddenUnit/sagas';

import toastRootSaga from '../services/toast/sagas';

export default function* rootSaga() {
  yield all([
    accountRootSaga(),
    bookRootSaga(),
    excelDownloadRootSaga(),
    purchasedMainRootSaga(),
    purchasedMainUnitRootSaga(),
    purchasedSearchRootSaga(),
    purchasedSearchUnitRootSaga(),
    purchasedHiddenSaga(),
    purchaseHiddenUnitRootSaga(),
    toastRootSaga(),
    commonRootSaga(),
  ]);
}
