import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import TitleBar from 'components/TitleBar';
import { ButtonType } from 'components/ActionBar/constants';
import BottomActionBar from 'components/BottomActionBar';
import { EmptyShelves } from 'components/Empty/EmptyShelves';
import { SHELF_NAME_LIMIT, SHELVES_LIMIT } from 'constants/shelves';
import * as promptActions from 'services/prompt/actions';
import { selectionActions } from 'services/selection/reducers';
import { getSelectedShelfIds } from 'services/selection/selectors';
import * as shelfActions from 'services/shelf/actions';
import * as shelfSelectors from 'services/shelf/selectors';
import * as toastActions from 'services/toast/actions';
import { ToastStyle } from 'services/toast/constants';

import SimpleShelves from './SimpleShelves';

const SelectShelf = ({ pageTitle, uuid, handleBackButtonClick, handleMoveButtonClick, totalSelectedCount }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(shelfActions.loadAllShelf());
  }, [dispatch]);
  const allShelf = useSelector(shelfSelectors.getAllShelf);
  const allShelfCount = allShelf.items ? allShelf.items.length : 0;
  const selectedShelfIds = useSelector(getSelectedShelfIds);

  const validateAddShelf = onValid => {
    dispatch(
      shelfActions.validateShelvesLimit({
        onValid,
        onInvalid: () => {
          dispatch(shelfActions.loadAllShelf());
          dispatch(
            toastActions.showToast({
              message: `최대 ${SHELVES_LIMIT}개까지 추가할 수 있습니다.`,
              toastStyle: ToastStyle.RED,
            }),
          );
        },
      }),
    );
  };

  const handleAddShelfConfirm = name => {
    validateAddShelf(() => {
      dispatch(selectionActions.clearSelectedShelves());
      dispatch(shelfActions.loadAllShelfAfterAdd({ name }));
    });
  };

  const handleAddShelf = () => {
    validateAddShelf(() => {
      dispatch(
        promptActions.showPrompt({
          title: '새 책장 추가',
          message: '새 책장의 이름을 입력해주세요.',
          placeHolder: '책장 이름',
          emptyInputAlertMessage: '책장의 이름을 입력해주세요.',
          onClickConfirmButton: handleAddShelfConfirm,
          limit: SHELF_NAME_LIMIT,
        }),
      );
    });
  };

  const actionBarProps = {
    buttonProps: [
      {
        name: '새 책장 추가',
        onClick: handleAddShelf,
        disable: allShelfCount >= SHELVES_LIMIT,
      },
      {
        type: ButtonType.SPACER,
      },
      {
        name: '이동',
        onClick: handleMoveButtonClick,
        disable: selectedShelfIds.length === 0,
      },
    ],
  };

  const renderMain = () => {
    const { loading, items: allShelfId } = allShelf;
    if (allShelfId) allShelfId.splice(allShelfId.indexOf(uuid), 1);
    if (loading) {
      return <p>로딩중!</p>;
    }
    if (allShelfId && allShelfId.length === 0) {
      return <EmptyShelves />;
    }
    if (allShelfId && allShelfId.length > 0) {
      return (
        <>
          <SimpleShelves shelfIds={allShelfId} />
          <BottomActionBar {...actionBarProps} />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - 내 서재`}</title>
      </Helmet>
      <div>
        <TitleBar title={`${totalSelectedCount}권을 이동할 책장 선택`} onBackClick={handleBackButtonClick} invertColor />
        {renderMain()}
      </div>
    </>
  );
};

export default SelectShelf;
