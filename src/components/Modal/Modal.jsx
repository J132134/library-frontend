import React from 'react';

import { ModalBackground } from './ModalBackground';
import * as modalStyles from './styles';

export const Modal = ({ a11y, isActive, children, style, onClickModalBackground, horizontalAlign, modalRef }) => (
  <>
    <section ref={modalRef} css={[modalStyles.modal(isActive, horizontalAlign), style]}>
      {a11y && <h2 className="a11y">{a11y}</h2>}
      {children}
    </section>
    <ModalBackground isActive={isActive} onClickModalBackground={onClickModalBackground} />
  </>
);
