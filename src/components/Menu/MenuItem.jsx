/** @jsx jsx */
import { jsx } from '@emotion/core';
import Link from 'next/link';
import { Icon } from '@ridi/rsg';
import * as styles from './styles';

import { snakelize } from '../../utils/snakelize';

export const MenuItem = ({ title, showIcon, icon, onClick }) => (
  <li css={styles.menuGroupItemWrapper}>
    <button type="button" css={styles.menuGroupItem} onClick={onClick}>
      {showIcon ? <Icon name={icon} css={styles.menuGroupItemIcon} /> : null}
      <span css={styles.menuGroupItemTitle}>{title}</span>
    </button>
  </li>
);

export const MenuLinkItem = ({ title, showIcon, icon, href, as, query = {} }) => (
  <li css={styles.menuGroupItemWrapper}>
    <Link href={{ pathname: href, query: snakelize(query) }} as={{ pathname: as, query: snakelize(query) }}>
      <a css={styles.menuGroupItem}>
        {showIcon ? <Icon name={icon} css={styles.menuGroupItemIcon} /> : null}
        <span css={styles.menuGroupItemTitle}>{title}</span>
      </a>
    </Link>
  </li>
);