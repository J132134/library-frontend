/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';
import config from '../../../config';
import { startExcelDownload } from '../../../services/excelDownload/actions';
import { getIsExcelDownloading } from '../../../services/excelDownload/selectors';
import { Hidden } from '../../../styles';
import LogoRidibooks from '../../../svgs/LogoRidibooks.svg';
import LogoRidiselect from '../../../svgs/LogoRidiselect.svg';
import MyMenuActiveIcon from '../../../svgs/MyMenu-active.svg';
import MyMenuIcon from '../../../svgs/MyMenu.svg';
import Responsive from '../Responsive';
import * as styles from './styles';

const FamilyServices = React.memo(() => (
  <ul css={styles.familyServiceList}>
    <li css={styles.familyServiceItem}>
      <a css={styles.familyServiceLink} href={config.STORE_BASE_URL}>
        <LogoRidibooks css={styles.ridibooksIcon} />
        <span css={Hidden}>RIDIBOOKS</span>
      </a>
    </li>
    <li css={[styles.familyServiceItem, styles.familyServiceItemSeparator]}>
      <a css={styles.familyServiceLink} href={config.SELECT_BASE_URL}>
        <LogoRidiselect css={styles.ridiSelectIcon} />
        <span css={Hidden}>RIDI Select</span>
      </a>
    </li>
  </ul>
));

function GNB(props) {
  const { userId } = props;

  const [isModalActive, setModalActive] = React.useState(false);
  const [MyMenuModal, setMyMenuModal] = React.useState(null);
  const handleModalBackgroundClick = React.useCallback(() => setModalActive(false), []);
  const handleMyMenuClick = React.useCallback(() => setModalActive(active => !active), []);

  React.useEffect(
    () => {
      if (userId != null) {
        import('../../../components/Modal/MyMenuModal').then(({ default: component }) => setMyMenuModal(() => component));
      }
    },
    [userId],
  );

  function renderMyMenu() {
    const { isExcelDownloading, dispatchStartExcelDownload } = props;
    const isIconInteractable = userId != null && MyMenuModal != null;

    return (
      <>
        <button
          id="MyMenuToggleButton"
          css={styles.myMenuToggleButton}
          onClick={isIconInteractable ? handleMyMenuClick : undefined}
          type="button"
        >
          {isIconInteractable && isModalActive ? (
            <MyMenuActiveIcon css={styles.myMenuActiveIcon} />
          ) : (
            <MyMenuIcon css={styles.myMenuIcon} />
          )}
          <span css={Hidden}>마이메뉴</span>
        </button>
        {isIconInteractable && (
          <MyMenuModal
            userId={userId}
            isActive={isModalActive}
            isExcelDownloading={isExcelDownloading}
            dispatchStartExcelDownload={dispatchStartExcelDownload}
            onClickModalBackground={handleModalBackgroundClick}
          />
        )}
      </>
    );
  }
  return (
    <Responsive css={styles.GNB}>
      <header css={styles.flexWrapper}>
        <div>
          <h1 css={styles.title}>
            <a css={styles.titleLink} href="/">
              내 서재
            </a>
          </h1>
        </div>
        <div css={styles.myMenuWrapper}>
          <FamilyServices />
          {renderMyMenu()}
        </div>
      </header>
    </Responsive>
  );
}

const mapStateToProps = state => {
  const isExcelDownloading = getIsExcelDownloading(state);
  const userId = state.account.userInfo ? state.account.userInfo.id : null;

  return {
    userId,
    isExcelDownloading,
  };
};

const mapDispatchToProps = {
  dispatchStartExcelDownload: startExcelDownload,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GNB);
