/** @jsx jsx */
import { jsx } from '@emotion/core';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import { LibraryBooks } from '../../../components/LibraryBooks';
import EmptyBookList from '../../../components/EmptyBookList';
import ResponsivePaginator from '../../../components/ResponsivePaginator';
import SkeletonBookList from '../../../components/Skeleton/SkeletonBookList';
import { URLMap } from '../../../constants/urls';
import { getBooks } from '../../../services/book/selectors';
import {
  changeSearchKeyword,
  selectAllBooks,
  clearSelectedBooks,
  downloadSelectedBooks,
  hideSelectedBooks,
  loadItems,
  toggleSelectBook,
} from '../../../services/purchased/search/actions';
import { getIsFetchingBooks, getItemsByPage, getSearchPageInfo, getSelectedBooks } from '../../../services/purchased/search/selectors';
import { toFlatten } from '../../../utils/array';
import { makeLinkProps, makeURI } from '../../../utils/uri';
import SearchBar from '../../../components/SearchBar';
import Editable from '../../../components/Editable';
import { TabBar, TabMenuTypes } from '../../base/LNB';
import Responsive from '../../base/Responsive';

class Search extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(loadItems());
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      hideTools: false,
    };
  }

  toggleEditingMode = () => {
    const { isEditing } = this.state;
    const { dispatchClearSelectedBooks } = this.props;

    if (isEditing === true) {
      dispatchClearSelectedBooks();
    }

    this.setState({ isEditing: !isEditing });
  };

  handleOnSubmitSearchBar = value => {
    const { href, as } = URLMap.search;
    Router.push(makeURI(href, { keyword: value }), makeURI(as, { keyword: value }));
  };

  handleOnFocusSearchBar = () => {
    this.setState({
      hideTools: true,
    });
  };

  handleOnBlurSearchBar = () => {
    this.setState({
      hideTools: false,
    });
  };

  handleOnClickHide = () => {
    const { dispatchHideSelectedBooks, dispatchClearSelectedBooks } = this.props;

    dispatchHideSelectedBooks();
    dispatchClearSelectedBooks();
    this.setState({ isEditing: false });
  };

  handleOnClickDownload = () => {
    const { dispatchDownloadSelectedBooks, dispatchClearSelectedBooks } = this.props;
    dispatchDownloadSelectedBooks();
    dispatchClearSelectedBooks();
    this.setState({ isEditing: false });
  };

  makeEditingBarProps() {
    const { items, selectedBooks, dispatchSelectAllBooks, dispatchClearSelectedBooks } = this.props;
    const totalSelectedCount = Object.keys(selectedBooks).length;
    const isSelectedAllBooks = totalSelectedCount === items.length;

    return {
      totalSelectedCount,
      isSelectedAllBooks,
      onClickSelectAllBooks: dispatchSelectAllBooks,
      onClickUnselectAllBooks: dispatchClearSelectedBooks,
      onClickSuccessButton: this.toggleEditingMode,
    };
  }

  makeActionBarProps() {
    const { selectedBooks } = this.props;
    const disable = Object.keys(selectedBooks).length === 0;

    return {
      buttonProps: [
        {
          name: '선택 숨기기',
          onClick: this.handleOnClickHide,
          disable,
        },
        {
          name: '선택 다운로드',
          onClick: this.handleOnClickDownload,
          disable,
        },
      ],
    };
  }

  renderSearchBar() {
    const { hideTools } = this.state;
    const {
      pageInfo: { keyword },
    } = this.props;

    const searchBarProps = {
      hideTools,
      keyword,
      handleOnSubmitSearchBar: this.handleOnSubmitSearchBar,
      handleOnFocusSearchBar: this.handleOnFocusSearchBar,
      handleOnBlurSearchBar: this.handleOnBlurSearchBar,
      edit: true,
      toggleEditingMode: this.toggleEditingMode,
      cancelSearch: true,
    };

    return <SearchBar {...searchBarProps} />;
  }

  renderBooks() {
    const { isEditing: isSelectMode } = this.state;
    const {
      items: libraryBookDTO,
      books: platformBookDTO,
      selectedBooks,
      dispatchToggleSelectBook,
      isFetchingBooks,
      viewType,
      pageInfo: { keyword },
    } = this.props;
    const onSelectedChange = dispatchToggleSelectBook;
    const showSkeleton = isFetchingBooks && libraryBookDTO.length === 0;

    if (showSkeleton) {
      return <SkeletonBookList viewType={viewType} />;
    }
    const linkPropsBuilder = _keyword => unitId =>
      makeLinkProps(
        {
          pathname: URLMap.searchUnit.href,
          query: { unitId },
        },
        URLMap.searchUnit.as(unitId),
        { keyword: _keyword },
      );

    return (
      <>
        <LibraryBooks
          {...{
            libraryBookDTO,
            platformBookDTO,
            selectedBooks,
            isSelectMode,
            onSelectedChange,
            viewType,
            linkPropsBuilder: linkPropsBuilder(keyword),
          }}
        />
        {this.renderPaginator()}
      </>
    );
  }

  renderPaginator() {
    const {
      pageInfo: { currentPage, totalPages, keyword },
    } = this.props;

    return (
      <ResponsivePaginator
        currentPage={currentPage}
        totalPages={totalPages}
        href={URLMap.search.href}
        as={URLMap.search.as}
        query={{ keyword }}
      />
    );
  }

  renderMain() {
    const {
      items,
      isFetchingBooks,
      pageInfo: { keyword },
    } = this.props;

    if (!isFetchingBooks && items.length === 0) {
      let message = `'${keyword}'에 대한 검색 결과가 없습니다.`;
      if (!keyword) {
        message = '검색어를 입력해주세요.';
      }

      return <EmptyBookList icon="search" message={message} />;
    }

    return <Responsive hasPadding={false}>{this.renderBooks()}</Responsive>;
  }

  render() {
    const { isEditing } = this.state;
    const {
      pageInfo: { keyword },
    } = this.props;

    let title = `'${keyword}' 검색 결과 - 내 서재`;
    if (!keyword) {
      title = '검색 - 내 서재';
    }

    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <TabBar activeMenu={TabMenuTypes.ALL_BOOKS} />
        <Editable
          allowFixed
          isEditing={isEditing}
          nonEditBar={this.renderSearchBar()}
          editingBarProps={this.makeEditingBarProps()}
          actionBarProps={this.makeActionBarProps()}
        >
          <main>{this.renderMain()}</main>
        </Editable>
      </>
    );
  }
}

const mapStateToProps = state => {
  const pageInfo = getSearchPageInfo(state);
  const items = getItemsByPage(state);
  const books = getBooks(state, toFlatten(items, 'b_id'));
  const selectedBooks = getSelectedBooks(state);
  const isFetchingBooks = getIsFetchingBooks(state);

  return {
    pageInfo,
    items,
    books,
    selectedBooks,
    isFetchingBooks,
    viewType: state.viewType,
  };
};

const mapDispatchToProps = {
  dispatchChangeSearchKeyword: changeSearchKeyword,
  dispatchSelectAllBooks: selectAllBooks,
  dispatchClearSelectedBooks: clearSelectedBooks,
  dispatchToggleSelectBook: toggleSelectBook,
  dispatchHideSelectedBooks: hideSelectedBooks,
  dispatchDownloadSelectedBooks: downloadSelectedBooks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
