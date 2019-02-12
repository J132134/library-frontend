/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Icon } from '@ridi/rsg';
import { Book } from '@ridi/web-ui/dist/index.node';
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import shortid from 'shortid';
import config from '../../config';
import { UnitType } from '../../constants/unitType';
import { downloadBooks, downloadBooksByUnitIds } from '../../services/bookDownload/actions';
import SkeletonUnitDetailView from '../Skeleton/SkeletonUnitDetailView';
import * as styles from './styles';
import BookMetaData from '../../utils/bookMetaData';

const LINE_HEIGHT = 23;
const LINE = 3;

class UnitDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = null;

    this.state = {
      isExpanded: false,
      isTruncated: false,
    };
  }

  checkTruncated() {
    if (this.wrapper) {
      if (!this.state.isTruncated && this.wrapper.offsetHeight > (LINE - 1) * LINE_HEIGHT) {
        this.setState({ isTruncated: true });
      }
    }
  }

  renderFileInfo = infosWithDelimiter => {
    const delimiter = '|';
    return (
      <div css={styles.fileInfo}>
        {infosWithDelimiter.map(info =>
          info === delimiter ? (
            <div key={shortid.generate()} css={styles.fileInfoDelimiter} />
          ) : (
            <div key={shortid.generate()} css={styles.fileInfoText}>
              {` ${info} `}
            </div>
          ),
        )}
      </div>
    );
  };

  expand() {
    this.setState({ isExpanded: true });
  }

  renderExpanderButton() {
    const { isExpanded, isTruncated } = this.state;

    if (isExpanded || !isTruncated) {
      return null;
    }

    return (
      <div css={styles.bookDescriptionExpend}>
        <button type="button" onClick={() => this.expand()} css={styles.bookDescriptionExpendButton}>
          계속 읽기
          <Icon css={styles.bookDescriptionExpendIcon} name="arrow_5_down" />
        </button>
      </div>
    );
  }

  renderDescription() {
    const { isExpanded } = this.state;
    const { bookDescription } = this.props;

    return (
      <div css={styles.description}>
        <div css={styles.descriptionTitle}>책 소개</div>
        <div
          css={[
            styles.bookDescriptionBody(LINE_HEIGHT),
            isExpanded ? styles.bookDescriptionExpended : styles.bookDescriptionFolded(LINE, LINE_HEIGHT),
          ]}
        >
          <p
            dangerouslySetInnerHTML={{ __html: bookDescription.intro.split('\n').join('<br />') }}
            ref={wrapper => {
              this.wrapper = wrapper;
              this.checkTruncated();
            }}
          />
        </div>
        {this.renderExpanderButton()}
      </div>
    );
  }

  renderDownloadButton() {
    const { unit, primaryItem, items, downloadable, dispatchDownloadBooksByUnitIds } = this.props;

    const bookExpired = new Date(primaryItem.expire_date) < new Date();
    if (!downloadable || bookExpired) {
      return null;
    }

    return (
      <button
        type="button"
        css={styles.downloadButton}
        onClick={() => {
          dispatchDownloadBooksByUnitIds([unit.id]);
        }}
      >
        {items.length > 1 ? '전체 다운로드' : '다운로드'}
      </button>
    );
  }

  renderDrmFreeDownloadButton() {
    const { book } = this.props;
    if (!book.file.is_drm_free) {
      return null;
    }

    return (
      <button
        type="button"
        css={styles.drmFreeDownloadButton}
        onClick={() => {
          window.location.href = `${config.STORE_API_BASE_URL}/api/user-books/${book.id}/raw-download`;
        }}
      >
        EPUB 파일 다운로드
      </button>
    );
  }

  renderLink() {
    const { book, primaryItem } = this.props;
    const href = primaryItem.is_ridiselect
      ? `${config.SELECT_BASE_URL}/book/${book.id}`
      : `${config.STORE_API_BASE_URL}/v2/Detail?id=${book.id}`;
    const serviceName = primaryItem.is_ridiselect ? '리디셀렉트' : '리디북스';
    return (
      <a css={styles.outerTextLink} href={href} target="_blank" rel="noopener noreferrer">
        {serviceName}에서 보기
        <Icon css={styles.outerLinkIcon} name="arrow_5_right" />
      </a>
    );
  }

  render() {
    const { unit, primaryItem, book, bookDescription } = this.props;

    if (!primaryItem || !book || !bookDescription) {
      return <SkeletonUnitDetailView />;
    }

    const bookMetadata = new BookMetaData(book);

    return (
      <>
        <section css={styles.header}>
          <div css={styles.thumbnailWrapper}>
            <div css={styles.thumbnail}>
              <Book.ThumbnailImage thumbnailUrl={book.thumbnail.large} />
            </div>
            {this.renderLink()}
          </div>
          <div css={styles.infoWrapper}>
            <div css={styles.unitTitle}>{unit.title}</div>
            <div css={styles.authorList}>{bookMetadata.author}</div>
            {UnitType.isBook(unit.type) ? this.renderFileInfo(bookMetadata.fileInfosWithDelimiter) : null}
            {this.renderDownloadButton()}
            {UnitType.isBook(unit.type) ? this.renderDrmFreeDownloadButton() : null}
          </div>
        </section>

        {this.renderDescription()}
      </>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  dispatchDownloadBooks: downloadBooks,
  dispatchDownloadBooksByUnitIds: downloadBooksByUnitIds,
};

const mergeProps = (state, actions, props) => {
  const book = props.primaryItem && props.books[props.primaryItem.b_id] ? props.books[props.primaryItem.b_id] : null;
  const bookDescription =
    props.primaryItem && props.bookDescriptions[props.primaryItem.b_id] ? props.bookDescriptions[props.primaryItem.b_id] : null;
  const bookMetadata =
    props.primaryItem && props.books[props.primaryItem.b_id] ? new BookMetaData(props.books[props.primaryItem.b_id]) : null;

  return {
    ...state,
    ...actions,
    ...props,
    book,
    bookDescription,
    bookMetadata,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(UnitDetailView);
