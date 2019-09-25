import createCachedSelector from 're-reselect';
import { EmptyUnit } from '../../utils/dataObject';
import { makeUnitOrderKey } from './actions';

export const getBook = (state, bookId) => state.books.books[bookId];
export const getUnit = (state, unitId) => state.books.units[unitId] || EmptyUnit;
export const getBookStarRating = (state, bookId) => state.books.bookStarRatings[bookId];
export const getBookDescription = (state, bookId) => state.books.bookDescriptions[state.books.books[bookId]?.series?.id || bookId];
export const getUnitOrders = (state, unitId, orderType, orderBy, page) =>
  state.books.unitOrders[makeUnitOrderKey(unitId, orderType, orderBy, page)];

export const getBooks = createCachedSelector(
  state => state.books.books,
  (state, bookIds) => bookIds,
  (books, bookIds) => Object.fromEntries(bookIds.map(bookId => [bookId, books[bookId]])),
)((state, bookIds) => [...bookIds].sort().join(','));

export const getBookDescriptions = createCachedSelector(
  state => state.books.bookDescriptions,
  (state, bookIds) => bookIds,
  (bookDescriptions, bookIds) => Object.fromEntries(bookIds.map(bookId => [bookId, bookDescriptions[bookIds]])),
)((state, bookIds) => [...bookIds].sort().join(','));

export const getBookStarRatings = createCachedSelector(
  state => state.books.bookStarRatings,
  (state, bookIds) => bookIds,
  (bookStarRatings, bookIds) => Object.fromEntries(bookIds.map(bookId => [bookId, bookStarRatings[bookIds]])),
)((state, bookIds) => [...bookIds].sort().join(','));

export const getUnits = createCachedSelector(
  state => state.books.units,
  (state, unitIds) => unitIds,
  (units, unitIds) => Object.fromEntries(unitIds.map(unitId => [unitId, units[unitId]])),
)((state, unitIds) => [...unitIds].sort().join(','));
