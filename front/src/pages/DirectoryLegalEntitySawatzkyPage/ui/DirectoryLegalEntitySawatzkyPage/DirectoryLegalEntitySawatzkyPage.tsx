import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { TableType } from 'widgets/Table';
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
      name: 'Наименование компании',
      group: 'Группа объектов',
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

  const {
    Table,
  } = useTable({
    data: tableData,
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <DirectoryPageWrapper className={classNames(cls.directoryLegalEntitySawatzkyPage, {}, [className])}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить объект" className={cls.button} theme={ButtonThemes.ICON} onClick={onLegalEntitySawatzkyFormOpenHandler}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить объект" className={cls.button} theme={ButtonThemes.ICON}>
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
