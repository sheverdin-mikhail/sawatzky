import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { TableItemsMod, TableType, TableItemType } from 'widgets/Table';
import { DirectoryPath } from 'shared/config/RouteConfig/appRouteConfig';
import {
  AddWorkMaterialGroupModal,
  addWorkMaterialGroupFormActions,
  addWorkMaterialGroupFormReducer,
  getAddWorkMaterialGroupFormIsOpen,
} from 'features/AddWorkMaterialGroup';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  deleteWorkMaterialGroup, getWorkMaterialGroup, workMaterialGroupReducer, fetchWorkMaterialGroupList,
} from 'entities/WorkMaterialGroup';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTable } from 'shared/lib/hooks/useTable';
import cls from './DirectoryWorkMaterialGroupPage.module.scss';

interface DirectoryObjectsGroupPageProps {
	className?: string;
}

const reducers: ReducersList = {
  workMaterialGroup: workMaterialGroupReducer,
  addWorkMaterialGroupForm: addWorkMaterialGroupFormReducer,
};

const DirectoryWorkMaterialGroupPage: React.FC<DirectoryObjectsGroupPageProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const workObjectsList = useSelector(getWorkMaterialGroup.selectAll);
  const tableData: TableType = useMemo(() => ({
    header: {
      id: 'ID',
      name: 'Наименование группы',
    },
    items: workObjectsList.map((item) => ({
      id: item.id,
      name: item.name,
    })),
  }), [workObjectsList]);

  const isOpen = useSelector(getAddWorkMaterialGroupFormIsOpen);

  useEffect(() => {
    dispatch(fetchWorkMaterialGroupList());
  }, [dispatch]);

  const openFormHandler = useCallback(() => {
    dispatch(addWorkMaterialGroupFormActions.openModal());
  }, [dispatch]);

  const onTableDeleteHandler = useCallback((item: TableItemType) => {
    dispatch(deleteWorkMaterialGroup(`${item.id}`));
  }, [dispatch]);

  const { Table, selectedItems } = useTable({
    data: tableData,
    mod: TableItemsMod.LINK,
    path: DirectoryPath.work_material_group_detail,
    onDelete: onTableDeleteHandler,
  });

  const onButtonDeleteHandler = useCallback(() => {
    if (selectedItems) {
      selectedItems.forEach((item) => {
        dispatch(deleteWorkMaterialGroup(`${item.id}`));
      });
    }
  }, [dispatch, selectedItems]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <DirectoryPageWrapper className={classNames(cls.directoryWorkMaterialGroupPage, {}, [className])}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить группу услуг" onClick={openFormHandler} className={cls.button} theme={ButtonThemes.ICON}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить группу услуг" className={cls.button} onClick={onButtonDeleteHandler} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        {Table}
        <AddWorkMaterialGroupModal className={cls.form} isOpen={isOpen} />
      </DirectoryPageWrapper>
    </DynamicModuleLoader>
  );
};

export default DirectoryWorkMaterialGroupPage;
