import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { TableItemType, TableType } from 'widgets/Table';
import {
  AddObjectModal, addWorkObjectFormActions, addWorkObjectFormReducer, getWorkObjectFormIsOpen,
} from 'features/AddObject';
import { useSelector } from 'react-redux';
import { fetchWorkObjectList, getWorkObject, workObjectReducer } from 'entities/WorkObject';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect, useMemo } from 'react';
import { deleteWorkObject } from 'entities/WorkObject/model/services/deleteWorObject';
import { useTable } from 'shared/lib/hooks/useTable';
import { fetchWorkObjectGroupList, getworkObjectGroup, workObjectGroupReducer } from 'entities/WorkObjectGroup';
import { useParams } from 'react-router-dom';
import { StateSchema } from 'app/providers';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import cls from './DirectoryObjectPage.module.scss';

interface DirectoryObjectPageProps {
	className?: string;
}

const reducers: ReducersList = {
  workObject: workObjectReducer,
  workObjectGroup: workObjectGroupReducer,
  addWorkObjectForm: addWorkObjectFormReducer,
};

const DirectoryObjectPage: React.FC<DirectoryObjectPageProps> = (props) => {
  const { className } = props;

  const addObjectsIsOpen = useSelector(getWorkObjectFormIsOpen);
  const { id } = useParams();
  const workObjectGroup = useSelector((state: StateSchema) => getworkObjectGroup.selectById(state, id!!));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkObjectGroupList());
    dispatch(addWorkObjectFormActions.initForm(+id!!));
  }, [dispatch, id]);

  const tableData: TableType = useMemo(() => ({
    header: {
      id: 'ID',
      groupName: 'Наименование группы объектов',
      name: 'Наименование объекта',
      code: 'Код объекта',
    },
    items: workObjectGroup?.workObjects?.map((item) => ({
      id: item.id,
      groupName: workObjectGroup?.name ?? '',
      name: item.name,
      code: item.code,
    })),
  }), [workObjectGroup]);

  const openAddWorkObjectForm = useCallback(() => {
    dispatch(addWorkObjectFormActions.openModal());
  }, [dispatch]);

  const closeAddWorkObjectForm = useCallback(() => {
    dispatch(addWorkObjectFormActions.closeModal());
  }, [dispatch]);

  const onTableDeleteHandler = useCallback((item: TableItemType) => {
    dispatch(deleteWorkObject(`${item.id}`));
  }, [dispatch]);

  const { Table, selectedItems } = useTable({
    data: tableData,
    onDelete: onTableDeleteHandler,
  });

  const onButtonDeleteHandler = useCallback(() => {
    if (selectedItems) {
      selectedItems.forEach((item) => {
        dispatch(deleteWorkObject(`${item.id}`));
      });
    }
  }, [dispatch, selectedItems]);

  return (
    <DirectoryPageWrapper className={classNames(cls.directoryObjectPage, {}, [className])}>
      <DynamicModuleLoader reducers={reducers}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить объект" onClick={openAddWorkObjectForm} className={cls.button} theme={ButtonThemes.ICON}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить объект" onClick={onButtonDeleteHandler} className={cls.button} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        { Table }
        <AddObjectModal isOpen={addObjectsIsOpen} onClose={closeAddWorkObjectForm} />
      </DynamicModuleLoader>
    </DirectoryPageWrapper>
  );
};

export default DirectoryObjectPage;
