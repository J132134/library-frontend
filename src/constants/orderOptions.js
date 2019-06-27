export const OrderBy = {
  ASC: 'asc',
  DESC: 'desc',
};

export const OrderType = {
  PURCHASE_DATE: 'purchase_date',
  EXPIRE_DATE: 'expire_date',
  EXPIRED_BOOKS_ONLY: 'expired_books_only',
  SHELF_CREATED: 'created',
  SHELF_NAME: 'name',
  UNIT_TITLE: 'unit_title',
  BOOK_TITLE: 'book_title',
  UNIT_AUTHOR: 'unit_author',
  BOOK_AUTHOR: 'book_author',
  UNIT_ORDER: 'unit_order',
  RELEASE_DATE: 'release_date',
};

const applyUnitOfCount = (order, unitOfCount) => ({
  ...order,
  title: order.titleTemplate(unitOfCount),
});

class BaseOrderOptions {
  static parse(key) {
    return this.toList().find(value => value.key === key);
  }

  static equal(a, b) {
    return a.key === b.key;
  }

  static toKey(orderType, orderBy) {
    const option = this.toList().find(value => value.orderType === orderType && value.orderBy === orderBy);
    return option.key;
  }

  static toList() {
    throw new Error('Need Implement toList');
  }

  static get DEFAULT() {
    throw new Error('Need Implement Default');
  }
}

export class OrderOptions extends BaseOrderOptions {
  static toMainList() {
    return [this.PURCHASE_DATE, this.UNIT_TITLE, this.UNIT_AUTHOR, this.EXPIRE_DATE, this.EXPIRED_BOOKS_ONLY];
  }

  static toSeriesList(unitOfCount) {
    return [
      this.UNIT_ORDER_DESC,
      applyUnitOfCount(this.UNIT_ORDER_ASC, unitOfCount),
      this.PURCHASE_DATE,
      this.EXPIRE_DATE,
      this.EXPIRED_BOOKS_ONLY,
    ];
  }

  static toShelves() {
    return [this.SHELF_CREATED, this.SHELF_NAME];
  }

  static toShelfList(unitOfCount) {
    return [
      applyUnitOfCount(this.UNIT_ORDER_DESC, unitOfCount),
      applyUnitOfCount(this.UNIT_ORDER_ASC, unitOfCount),
      this.PURCHASE_DATE,
      this.EXPIRE_DATE,
      this.EXPIRED_BOOKS_ONLY,
      this.BOOK_TITLE,
      this.BOOK_AUTHOR,
    ];
  }

  static toList() {
    return [
      this.PURCHASE_DATE,
      this.UNIT_TITLE,
      this.UNIT_AUTHOR,
      this.EXPIRE_DATE,
      this.EXPIRED_BOOKS_ONLY,
      this.SHELF_CREATED,
      this.SHELF_NAME,
      this.UNIT_ORDER_DESC,
      this.UNIT_ORDER_ASC,
      this.BOOK_TITLE,
      this.BOOK_AUTHOR,
    ];
  }

  static get DEFAULT() {
    return this.PURCHASE_DATE;
  }

  static get SHELF_CREATED() {
    return {
      key: 'SHELF_CREATED',
      title: '최근 생성순',
      orderType: OrderType.SHELF_CREATED,
      orderBy: OrderBy.DESC,
    };
  }

  static get SHELF_NAME() {
    return {
      key: 'SHELF_NAME',
      title: '이름 가나다순',
      orderType: OrderType.SHELF_NAME,
      orderBy: OrderBy.ASC,
    };
  }

  static get UNIT_LIST_DEFAULT() {
    return this.UNIT_ORDER_DESC;
  }

  static get PURCHASE_DATE() {
    return {
      key: 'PURCHASE_DATE',
      title: '최근 구매순',
      orderType: OrderType.PURCHASE_DATE,
      orderBy: OrderBy.DESC,
    };
  }

  static get EXPIRE_DATE() {
    return {
      key: 'EXPIRE_DATE',
      title: '대여 만료 임박순',
      orderType: OrderType.EXPIRE_DATE,
      orderBy: OrderBy.ASC,
    };
  }

  static get UNIT_TITLE() {
    return {
      key: 'UNIT_TITLE',
      title: '제목 가나다순',
      orderType: OrderType.UNIT_TITLE,
      orderBy: OrderBy.ASC,
    };
  }

  static get UNIT_AUTHOR() {
    return {
      key: 'UNIT_AUTHOR',
      title: '저자 가나다순',
      orderType: OrderType.UNIT_AUTHOR,
      orderBy: OrderBy.ASC,
    };
  }

  static get EXPIRED_BOOKS_ONLY() {
    return {
      key: 'EXPIRED_BOOKS_ONLY',
      title: '만료 도서만 보기',
      orderType: OrderType.EXPIRED_BOOKS_ONLY,
      orderBy: OrderBy.DESC,
    };
  }

  static get UNIT_ORDER_DESC() {
    return {
      titleTemplate: unitOfCount => `마지막 ${unitOfCount || '권'}부터`,

      key: 'UNIT_ORDER_DESC',
      title: '최근 업데이트순',
      orderType: OrderType.UNIT_ORDER,
      orderBy: OrderBy.DESC,
    };
  }

  static get UNIT_ORDER_ASC() {
    return {
      titleTemplate: unitOfCount => `1${unitOfCount || '권'}부터`,

      key: 'UNIT_ORDER_ASC',
      title: '1권부터',
      orderType: OrderType.UNIT_ORDER,
      orderBy: OrderBy.ASC,
    };
  }

  static get BOOK_TITLE() {
    return {
      key: 'BOOK_TITLE',
      title: '제목순',
      orderType: OrderType.BOOK_TITLE,
      orderBy: OrderBy.ASC,
    };
  }

  static get BOOK_AUTHOR() {
    return {
      key: 'BOOK_AUTHOR',
      title: '저자순',
      orderType: OrderType.BOOK_AUTHOR,
      orderBy: OrderBy.ASC,
    };
  }
}
