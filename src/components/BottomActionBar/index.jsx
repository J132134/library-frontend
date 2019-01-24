/** @jsx jsx */
import { jsx } from '@emotion/core';
import shortid from 'shortid';
import { ActionBar, ActionButton } from '../ActionBar';

const BottomActionBar = ({ buttonProps }) => (
  <ActionBar>
    {buttonProps.map(button => (
      <ActionButton key={shortid.generate()} name={button.name} type={button.type} onClick={button.onClick} disable={button.disable} />
    ))}
  </ActionBar>
);

export default BottomActionBar;
