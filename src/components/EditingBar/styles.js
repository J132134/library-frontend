import { css } from '@emotion/core';

export const editingBarWrapper = css({
  width: '100%',
  height: 46,
  backgroundColor: '#0077d9',
  boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.04)',
});

export const editingBar = css({
  padding: '8px 0',
  height: 30,
});

export const editingBarIconWrapper = css({
  height: 30,
  paddingLeft: 16,
  float: 'left',
  position: 'relative',
});

export const editingBarIcon = css({
  position: 'absolute',
  width: 12,
  height: 9,
  top: '50%',
  left: 0,
  transform: 'translate3d(0, -50%, 0)',
  fill: '#ffffff',
});
export const editingBarSelectCount = css({
  height: 20,
  padding: '5px 0',
  fontSize: 15,
  letterSpacing: '-0.3px',
  color: '#ffffff',
  lineHeight: '20px',
});

export const editingBarButtonWrapper = css({
  float: 'right',
});

export const editingBarAllSelect = css({
  marginRight: 16,
  fontSize: 15,
  letterSpacing: '-0.3px',
  color: '#ffffff',
});
export const editingBarCompleteButton = css({
  width: 52,
  height: 30,
  padding: '7px 0',
  borderRadius: 4,
  backgroundColor: '#ffffff',
  boxShadow: '1px 1px 1px 0 rgba(0, 0, 0, 0.05)',
  border: '1px solid #d1d5d9',
  boxSizing: 'border-box',

  fontSize: 13,
  fontWeight: 'bold',
  letterSpacing: '-0.3px',
  textAlign: 'center',
  color: '#0077d9',
});