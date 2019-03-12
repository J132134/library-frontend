import { createSelector } from 'reselect';

const getPurchasedCommonState = state => state.purchasedCommon;

export const getReadLatestBookId = (state, unitId) =>
  createSelector(
    getPurchasedCommonState,
    state => state.readLatestBookIds[unitId],
  )(state);

export const getIsLoadingReadLatest = createSelector(
  getPurchasedCommonState,
  state => state.loadingReadLatest,
);

export const getRecentlyUpdatedData = (state, bookIds) =>
  createSelector(
    getPurchasedCommonState,
    state =>
      bookIds.reduce((previous, bookId) => {
        previous[bookId] = state.recentlyUpdatedData[bookId];
        return previous;
      }, {}),
  )(state);
