/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import Head from 'next/head';
import { connect } from 'react-redux';

import LNBHiddenTitleBar from '../base/LNB/LNBHiddenTitleBar';
import Responsive from '../base/Responsive';
import EditingBar from '../../components/EditingBar';
import BookList from '../../components/BookList';
import LibraryBook from '../../components/LibraryBook';
import Paginator from '../../components/Paginator';
import { BottomActionBar, BottomActionButton } from '../../components/BottomActionBar';

import { getBooks } from '../../services/book/selectors';
import {
  loadPurchasedHiddenItems,
  selectAllHiddenBooks,
  clearSelectedHiddenBooks,
  toggleSelectHiddenBook,
  showSelectedBooks,
  deleteSelectedBooks,
} from '../../services/purchased/hidden/actions';
import { getItemsByPage, getPageInfo, getItemTotalCount, getSelectedHiddenBooks } from '../../services/purchased/hidden/selectors';
import { PAGE_COUNT } from '../../constants/page';
import { URLMap } from '../../constants/urls';

import { toFlatten } from '../../utils/array';

const styles = {
  hiddenButtonActionLeft: css({
    color: '#e64938',
    float: 'left',
  }),
  hiddenButtonActionRight: css({
    float: 'right',
  }),
};

class Hidden extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(loadPurchasedHiddenItems());
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  toggleEditingMode = () => {
    const { isEditing } = this.state;
    const { clearSelectedHiddenBooks: dispatchClearSelectedHiddenBooks } = this.props;

    if (isEditing === true) {
      dispatchClearSelectedHiddenBooks();
    }

    this.setState({ isEditing: !isEditing });
  };

  handleOnClickDelete = () => {
    const { deleteSelectedBooks: dispatchDeleteSelectedBooks, clearSelectedHiddenBooks: dispatchClearSelectedHiddenBooks } = this.props;

    dispatchDeleteSelectedBooks();
    dispatchClearSelectedHiddenBooks();
    this.setState({ isEditing: false });
  };

  handleOnClickShow = () => {
    const { showSelectedBooks: dispatchShowSelectedBooks, clearSelectedHiddenBooks: dispatchClearSelectedHiddenBooks } = this.props;

    dispatchShowSelectedBooks();
    dispatchClearSelectedHiddenBooks();
    this.setState({ isEditing: false });
  };

  renderEditingBar() {
    const {
      items,
      selectedBooks,
      selectAllHiddenBooks: dispatchSelectAllHiddenBooks,
      clearSelectedHiddenBooks: dispatchClearSelectedHiddenBooks,
    } = this.props;

    const selectedCount = Object.keys(selectedBooks).length;
    const isSelectedAllBooks = selectedCount === items.length;

    return (
      <EditingBar
        totalSelectedCount={selectedCount}
        isSelectedAllBooks={isSelectedAllBooks}
        onClickSelectAllBooks={dispatchSelectAllHiddenBooks}
        onClickUnselectAllBooks={dispatchClearSelectedHiddenBooks}
        onClickSuccessButton={this.toggleEditingMode}
      />
    );
  }

  renderBooks() {
    const { isEditing } = this.state;
    const { items, books, selectedBooks, toggleSelectHiddenBook: dispatchToggleSelectHiddenBook } = this.props;

    return (
      <BookList>
        {items.map(item => (
          <LibraryBook
            key={item.b_id}
            item={item}
            book={books[item.b_id]}
            isEditing={isEditing}
            checked={!!selectedBooks[item.b_id]}
            onChangeCheckbox={() => dispatchToggleSelectHiddenBook(item.b_id)}
          />
        ))}
      </BookList>
    );
  }

  renderPaginator() {
    const {
      pageInfo: { currentPage, totalPages },
    } = this.props;

    return (
      <Paginator currentPage={currentPage} totalPages={totalPages} pageCount={PAGE_COUNT} href={URLMap.hidden.href} as={URLMap.hidden.as} />
    );
  }

  renderBottomActionBar() {
    const { isEditing } = this.state;
    const { selectedBooks } = this.props;
    if (!isEditing) {
      return null;
    }

    const disable = Object.keys(selectedBooks).length === 0;
    return (
      <BottomActionBar>
        <BottomActionButton
          name="선택 영구 삭제"
          css={styles.hiddenButtonActionLeft}
          onClick={this.handleOnClickDelete}
          disable={disable}
        />
        <BottomActionButton name="선택 숨김 해제" css={styles.hiddenButtonActionRight} onClick={this.handleOnClickShow} disable={disable} />
      </BottomActionBar>
    );
  }

  render() {
    const { isEditing } = this.state;
    const { itemTotalCount } = this.props;
    return (
      <>
        <Head>
          <title>리디북스 - 숨김목록</title>
        </Head>
        {isEditing ? (
          this.renderEditingBar()
        ) : (
          <LNBHiddenTitleBar
            title="숨긴 도서 목록"
            hiddenTotalCount={itemTotalCount}
            onClickEditingMode={this.toggleEditingMode}
            href={URLMap.main.href}
            as={URLMap.main.as}
          />
        )}
        <main>
          <Responsive>
            {this.renderBooks()}
            {this.renderPaginator()}
          </Responsive>
        </main>
        {isEditing ? this.renderBottomActionBar() : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  const pageInfo = getPageInfo(state);
  const items = getItemsByPage(state);
  const books = getBooks(state, toFlatten(items, 'b_id'));
  const itemTotalCount = getItemTotalCount(state);
  const selectedBooks = getSelectedHiddenBooks(state);
  return {
    pageInfo,
    items,
    books,
    itemTotalCount,
    selectedBooks,
  };
};

const mapDispatchToProps = {
  selectAllHiddenBooks,
  clearSelectedHiddenBooks,
  toggleSelectHiddenBook,
  showSelectedBooks,
  deleteSelectedBooks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hidden);
