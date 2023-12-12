import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { TableItemType, TableType } from 'widgets/Table';
import {
  CreateLegalEntityModal,
  createLegalEntityReducer,
  createLegalEntityActions,
  getCreateLegalEntityIsOpen,
} from 'features/CreateLegalEntity';
import { useCallback, useEffect, useMemo } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchWorkObjectGroupList, workObjectGroupReducer } from 'entities/WorkObjectGroup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchLegalEntityList, getLegalEntity, legalEntityReducer } from 'entities/LegalEntity';
import { useTable } from 'shared/lib/hooks/useTable';
import { deleteLegalEntity } from 'entities/LegalEntity/model/services/deleteLegalEntity';
import cls from './DirectoryLegalEntitySawatzkyPage.module.scss';

interface DirectoryLegalEntitySawatzkyPageProps {
  className?: string;
}

const reducers: ReducersList = {
  workObjectGroup: workObjectGroupReducer,
  createLegalEntityForm: createLegalEntityReducer,
  legalEntity: legalEntityReducer,
};

const DirectoryLegalEntitySawatzkyPage: React.FC<DirectoryLegalEntitySawatzkyPageProps> = (props) => {
  const { className } = props;

  const legalEntitySawatzkyFormIsOpen = useSelector(getCreateLegalEntityIsOpen);
  const dispatch = useAppDispatch();
  const legalEntities = useSelector(getLegalEntity.selectAll);

  useEffect(() => {
    dispatch(fetchWorkObjectGroupList());
    dispatch(fetchLegalEntityList(true));
  }, [dispatch]);

  const onLegalEntitySawatzkyFormCloseHandler = useCallback(() => {
    dispatch(createLegalEntityActions.closeModal());
  }, [dispatch]);

  const onLegalEntitySawatzkyFormOpenHandler = useCallback(() => {
    dispatch(createLegalEntityActions.setSawatzky(true));
    dispatch(createLegalEntityActions.openModal());
  }, [dispatch]);

  const tableData: TableType = {
    header: {
      id: 'ID',
      name: 'Наименование Юр. лица',
      group: 'Группа',
      object: 'Объект',
    },
    items: useMemo(() => legalEntities.map((entity) => (
      {
        id: entity.id ?? '',
        name: entity.name ?? '',
        group: entity.workObjectsGroup?.name ?? '',
        object: entity.workObject?.name ?? '',

      }
    )), [legalEntities]),
  };

  const onTableDeleteHandler = useCallback((item: TableItemType) => {
    dispatch(deleteLegalEntity(`${item.id}`));
    dispatch(fetchLegalEntityList(true));
  }, [dispatch]);

  const { Table, selectedItems } = useTable({
    data: tableData,
    onDelete: onTableDeleteHandler,
  });

  const onButtonDeleteHandler = useCallback(() => {
    if (selectedItems) {
      selectedItems.forEach((item) => {
        dispatch(deleteLegalEntity(`${item.id}`));
        dispatch(fetchLegalEntityList(true));
      });
    }
  }, [dispatch, selectedItems]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <DirectoryPageWrapper className={classNames(cls.directoryLegalEntitySawatzkyPage, {}, [className])}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить юр. лицо Sawatzky" className={cls.button} theme={ButtonThemes.ICON} onClick={onLegalEntitySawatzkyFormOpenHandler}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить юр. лицо Sawatzky" className={cls.button} onClick={onButtonDeleteHandler} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        {Table}
        <CreateLegalEntityModal isSawatzky className={cls.form} isOpen={legalEntitySawatzkyFormIsOpen} onClose={onLegalEntitySawatzkyFormCloseHandler} />
      </DirectoryPageWrapper>
    </DynamicModuleLoader>
  );
};

export default DirectoryLegalEntitySawatzkyPage;
