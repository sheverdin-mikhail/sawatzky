import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import {
  TableItemType, TableItemsMod, TableType,
} from 'widgets/Table';
import { DirectoryPath } from 'shared/config/RouteConfig/appRouteConfig';
import { AddObjectsGroupModal } from 'features/AddObjectsGroup/ui/AddObjectsGroupModal/AddObjectsGroupModal';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getWorkObjectGroup, workObjectGroupReducer, fetchWorkObjectGroupList, deleteWorkObjectGroup,
} from 'entities/WorkObjectGroup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useTable } from 'shared/lib/hooks/useTable';
import { addWorkObjectGroupFormActions, addWorkObjectGroupFormReducer, getWorkObjectGroupFormIsOpen } from 'features/AddObjectsGroup';
import cls from './DirectoryObjectsGroupPage.module.scss';

interface DirectoryObjectsGroupPageProps {
	className?: string;
}

const reducers: ReducersList = {
  workObjectGroup: workObjectGroupReducer,
  addWorkObjectGroupForm: addWorkObjectGroupFormReducer,
};

const DirectoryObjectsGroupPage: React.FC<DirectoryObjectsGroupPageProps> = (props) => {
  const { className } = props;

  const addObjectsIsOpen = useSelector(getWorkObjectGroupFormIsOpen);
  const workObjectGroups = useSelector(getWorkObjectGroup.selectAll);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkObjectGroupList());
  }, [dispatch]);

  const tableData: TableType = {
    header: {
      id: 'ID',
      name: 'Наименование группы',
    },
    items: workObjectGroups.map((item) => ({
      id: item.id,
      name: item.name,
    })),
  };

  const openAddWorkObjectForm = useCallback(() => {
    dispatch(addWorkObjectGroupFormActions.openModal());
  }, [dispatch]);

  const closeAddWorkObjectForm = useCallback(() => {
    dispatch(addWorkObjectGroupFormActions.closeModal());
  }, [dispatch]);

  const onTableDeleteHandler = useCallback((item: TableItemType) => {
    dispatch(deleteWorkObjectGroup(`${item.id}`));
  }, [dispatch]);

  const { Table, selectedItems } = useTable({
    data: tableData,
    mod: TableItemsMod.LINK,
    path: DirectoryPath.object,
    onDelete: onTableDeleteHandler,
  });

  const onButtonDeleteHandler = useCallback(() => {
    if (selectedItems) {
      selectedItems.forEach((item) => {
        dispatch(deleteWorkObjectGroup(`${item.id}`));
      });
    }
  }, [dispatch, selectedItems]);

  return (
    <DirectoryPageWrapper className={classNames(cls.directoryObjectsGroupPage, {}, [className])}>
      <DynamicModuleLoader reducers={reducers}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить группу объектов" onClick={openAddWorkObjectForm} className={cls.button} theme={ButtonThemes.ICON}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить группу объектов" onClick={onButtonDeleteHandler} className={cls.button} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        {Table}
        <AddObjectsGroupModal isOpen={addObjectsIsOpen} onClose={closeAddWorkObjectForm} className={cls.form} />
      </DynamicModuleLoader>
    </DirectoryPageWrapper>
  );
};

export default DirectoryObjectsGroupPage;
