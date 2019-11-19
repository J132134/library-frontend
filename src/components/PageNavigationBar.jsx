import { css } from '@emotion/core';

import Responsive from '../pages/base/Responsive';
import ArrowLeft from '../svgs/ArrowLeft.svg';

export const NavigationBarColor = {
  BLUE: 'blue',
  WHITE: 'white',
};

const wrapper = css`
  width: 100%;
`;
const wrapperStyles = {
  [NavigationBarColor.BLUE]: css`
    background-color: #0077d9;
  `,
  [NavigationBarColor.WHITE]: css`
    background-color: white;
    border-top: 1px solid #f3f4f5;
    border-bottom: 1px solid #d1d5d9;
    margin-top: -1px;
  `,
};
const bar = css`
  height: 46px;
  display: flex;
  align-items: center;
`;
const iconWrapper = css`
  display: block;
  padding: 15px 10px 14px 0;
  line-height: 0;
`;
const icon = css`
  width: 16px;
  height: 16px;
  fill: white;
`;
const title = css`
  font-size: 16px;
  font-weight: bold;
  color: white;
  height: 30px;
  line-height: 30px;
  flex: 1 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// TODO: Title이랑 잘 합쳐보기
export default function PageNavigationBar({ color = NavigationBarColor.WHITE, children, onBackClick }) {
  return (
    <Responsive css={[wrapper, wrapperStyles[color]]}>
      <div css={bar}>
        <button type="button" css={iconWrapper} onClick={onBackClick}>
          <ArrowLeft css={icon} />
          <span className="a11y">뒤로 가기</span>
        </button>
        <h2 css={title}>{children}</h2>
      </div>
    </Responsive>
  );
}
