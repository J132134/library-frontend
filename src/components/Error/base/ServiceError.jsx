import React from 'react';
import Helmet from 'react-helmet';

import ErrorBook from '../../../svgs/ErrorBook.svg';
import styles from './serviceErrorStyles';

const onClickReload = () => {
  window.location.reload();
};

const onClickHistoryBack = () => {
  window.history.back();
};

const ServiceError = ({ children, errorTitle, reloadButton, prevPageButton, homeButton }) => {
  const renderReloadButton = () => (
    <li css={styles.errorButtonWrapper}>
      <button type="button" css={[styles.errorButton, styles.whiteButton]} onClick={onClickReload}>
        새로 고침
      </button>
    </li>
  );

  const renderPrevPageButton = () => (
    <li css={styles.errorButtonWrapper}>
      <button type="button" css={[styles.errorButton, styles.whiteButton]} onClick={onClickHistoryBack}>
        이전페이지
      </button>
    </li>
  );

  const renderHomeButton = () => (
    <li css={styles.errorButtonWrapper}>
      <a css={[styles.errorButton, styles.grayButton]} href="/">
        홈으로 돌아가기
      </a>
    </li>
  );

  return (
    <>
      <Helmet>
        <title>{errorTitle || ''}에러 - 내 서재</title>
      </Helmet>
      <section css={styles.pageError}>
        <div>
          <ErrorBook css={styles.icon} />
        </div>
        {errorTitle && <h2 css={styles.errorTitle}>{errorTitle}</h2>}
        <p css={styles.errorDescription}>{children}</p>
        <ul>
          {reloadButton && renderReloadButton()}
          {prevPageButton && renderPrevPageButton()}
          {homeButton && renderHomeButton()}
        </ul>
      </section>
    </>
  );
};

export default ServiceError;
