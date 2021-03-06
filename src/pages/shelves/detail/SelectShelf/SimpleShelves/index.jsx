import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SimpleShelvesWrapper from 'components/SimpleShelvesWrapper';
import SimpleShelvesItem from 'components/SimpleShelvesWrapper/SimpleShelvesItem';
import { selectionActions } from 'services/selection/reducers';
import { getSelectedShelfIds } from 'services/selection/selectors';

import SimpleShelf from './SimpleShelf';

const SimpleShelves = ({ shelfIds }) => {
  const dispatch = useDispatch();
  const selectedShelfIds = useSelector(getSelectedShelfIds);
  const handleShelfSelectChange = shelfId => {
    dispatch(selectionActions.clearSelectedShelves());
    dispatch(selectionActions.selectShelves([shelfId]));
  };
  const renderShelves = () =>
    shelfIds.map(shelfId => (
      <SimpleShelvesItem key={shelfId}>
        <SimpleShelf shelfId={shelfId} isSelect={selectedShelfIds.includes(shelfId)} handleShelfSelectChange={handleShelfSelectChange} />
      </SimpleShelvesItem>
    ));

  return <SimpleShelvesWrapper>{renderShelves()}</SimpleShelvesWrapper>;
};

export default SimpleShelves;
