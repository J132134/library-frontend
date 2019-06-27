import { css } from '@emotion/core';
import { MQ, Responsive } from '../../styles/responsive';

export const responsiveMetaStyles = (underLargeSizeStyles, moreThanLargeSizeStyles) => `
  ${MQ([Responsive.XSmall, Responsive.Small, Responsive.Medium, Responsive.Large], underLargeSizeStyles)}
  ${MQ([Responsive.XLarge, Responsive.XXLarge, Responsive.Full], moreThanLargeSizeStyles)}
`;

const responsiveNameWrapper = responsiveMetaStyles(
  `
    padding: 8px 7px;
    font-size: 15px;
  `,
  `
    padding: 14px 11px;
    font-size: 17px;
  `,
);

const ResponsiveCountWrapper = responsiveMetaStyles(
  `
    padding: 1px 7px 11px 7px;
    font-size: 15px;
  `,
  `
    padding: 10px 11px 15px 11px;
    font-size: 17px;
  `,
);

const WrapperBorderRadius = 4;
const WrapperBorderWidth = 1;
const InnerBorderRadius = WrapperBorderRadius - WrapperBorderWidth;

export const shelfStyles = {
  wrapper: css`
    border: ${WrapperBorderWidth}px solid #d1d5d9;
    border-radius: ${WrapperBorderRadius}px;
    background: white;
    position: relative;
    box-sizing: border-box;
    width: inherit;
    min-height: inherit;
    transition: transform ease 0.3s, box-shadow ease 0.3s;
    transform: translate3d(0, 0, 0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    &:hover {
      transform: translate3d(0, -4px, 0);
      box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.1);
    }
  `,
  thumbnails: css`
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid #d1d5d9;
    border-radius: ${InnerBorderRadius}px ${InnerBorderRadius}px 0 0;
    overflow: hidden;
  `,
  thumbnail: css`
    background: #e6e8eb;
    border-left: 1px solid #d1d5d9;
    flex: 1;
    line-height: 0;
    &:first-of-type {
      border-left: 0;
    }
  `,
  thumbnailImage: css`
    position: relative;
    width: 100%;
  `,
  image: css`
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  `,
  infoWrapper: css`
    background: white;
    border-radius: 0 0 ${InnerBorderRadius}px ${InnerBorderRadius}px;
  `,
  nameWrapper: css`
    ${responsiveNameWrapper}
  `,
  name: css`
    font-weight: bold;
    color: #40474d;
    line-height: 1.2em;
    font-size: inherit;

    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    word-break: break-all;
  `,
  countWrapper: css`
    ${ResponsiveCountWrapper}
  `,
  count: css`
    position: relative;
    display: inline-block;
    padding: 0 14px 0 10px;
    border: solid 1px #808991;
    border-radius: 30px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #808991;
  `,
  countArrowIcon: css`
    display: block;
    position: absolute;
    right: 6px;
    top: 50%;
    margin-top: -3px;
    width: 3px;
    height: 6px;
    fill: #808991;
  `,
  link: css`
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  `,
  selectWrapper: css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background-color: rgba(0, 0, 0, 0.4);
  `,
  selectLabel: css`
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    input {
      width: 0px;
      height: 0px;
    }
  `,
  selectIconWrapper: css`
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 40px;
    height: 40px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 40px;
    overflow: hidden;
  `,
  selectIcon: css`
    fill: white;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    &.active {
      background: rgb(31, 140, 230);
    }
  `,
};
