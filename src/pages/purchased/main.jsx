import React from 'react';
import { connect } from 'react-redux';

import BookList from '../../components/BookList';
import LibraryBook from '../../components/LibraryBook';
import Paginator from '../../components/Paginator';
import SelectBox from '../../components/SelectBox';
import ConnectedEditingBar from '../../components/EditingBar';

import ConnectedLNBTabBar from '../base/LNB/LNBTabBar';

import { loadPurchaseItems, changePurchaseOrder, changePurchaseFilter, changePurchasePage } from '../../services/purchased/main/actions';

import { getBooks } from '../../services/book/selectors';
import { getItemsByPage, getPageInfo, getFilterOptions } from '../../services/purchased/main/selectors';

import { toFlatten } from '../../utils/array';
import { PAGE_COUNT } from '../../constants/page';
import { MainOrderOptions } from '../../constants/orderOptions';

class Index extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(loadPurchaseItems());
  }

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };

    this.toggleEditingMode = this.toggleEditingMode.bind(this);
  }

  toggleEditingMode() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  renderToolBar() {
    const { isEditing } = this.state;
    const {
      pageInfo: { order, filter },
      filterOptions,
      changePurchaseOrder: dispatchChangePurchaseOrder,
      changePurchaseFilter: dispatchChangePurchaseFilter,
    } = this.props;

    if (isEditing) {
      return <ConnectedEditingBar onClickSuccessButton={this.toggleEditingMode} />;
    }

    return (
      <div>
        <button type="button" onClick={this.toggleEditingMode}>
          편집
          <span className="a11y">편집</span>
        </button>
        <div>
          <SelectBox selected={order} options={MainOrderOptions.toList()} onChange={value => dispatchChangePurchaseOrder(value)} />
          <SelectBox selected={filter} options={filterOptions} onChange={value => dispatchChangePurchaseFilter(value)} />
        </div>
      </div>
    );
  }

  renderBooks() {
    const { items, books } = this.props;
    return (
      <BookList>
        {items.map(item => (
          <LibraryBook key={item.b_id} item={item} book={books[item.b_id]} />
        ))}
      </BookList>
    );
  }

  renderPaginator() {
    const {
      pageInfo: { currentPage, totalPages },
      changePurchasePage: dispatchChangePurchasePage,
    } = this.props;

    return (
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        pageCount={PAGE_COUNT}
        onClickPageItem={page => dispatchChangePurchasePage(page)}
      />
    );
  }

  render() {
    return (
      <>
        <ConnectedLNBTabBar />
        <main>
          {this.renderToolBar()}
          {this.renderBooks()}
          {this.renderPaginator()}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => {
  const pageInfo = getPageInfo(state);
  const filterOptions = getFilterOptions(state);
  const items = getItemsByPage(state);
  const books = getBooks(state, toFlatten(items, 'b_id'));
  return {
    pageInfo,
    filterOptions,
    items,
    books,
  };
};

const mapDispatchToProps = {
  changePurchaseOrder,
  changePurchaseFilter,
  changePurchasePage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
