import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { Table, TableType } from 'widgets/Table';
import { CreateLegalEntityModal, createLegalEntityReducer } from 'features/CreateLegalEntity';
import { useCallback, useEffect, useState } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchWorkObjectGroupList, workObjectGroupReducer } from 'entities/WorkObjectGroup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './DirectoryLegalEntitySawatzkyPage.module.scss';

interface DirectoryLegalEntitySawatzkyPageProps {
  className?: string;
}

const reducers: ReducersList = {
  workObjectGroup: workObjectGroupReducer,
  createLegalEntityForm: createLegalEntityReducer,
};

const DirectoryLegalEntitySawatzkyPage: React.FC<DirectoryLegalEntitySawatzkyPageProps> = (props) => {
  const { className } = props;

  const [legalEntitySawatzkyFormIsOpen, setLegalEntitySawatzkyFormIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkObjectGroupList());
  }, [dispatch]);

  const onLegalEntitySawatzkyFormCloseHandler = useCallback(() => {
    setLegalEntitySawatzkyFormIsOpen(false);
  }, []);

  const tableData: TableType = {
    header: {
      id: 'ID',
      name: 'Наименование компании',
      group: 'Группа объектов',
      object: 'Объект',
    },
    items: [
    ],
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <DirectoryPageWrapper className={classNames(cls.directoryLegalEntitySawatzkyPage, {}, [className])}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить объект" className={cls.button} theme={ButtonThemes.ICON} onClick={() => setLegalEntitySawatzkyFormIsOpen(true)}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить объект" className={cls.button} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        <Table data={tableData} />
        <CreateLegalEntityModal className={cls.form} isOpen={legalEntitySawatzkyFormIsOpen} onClose={onLegalEntitySawatzkyFormCloseHandler} />
      </DirectoryPageWrapper>
    </DynamicModuleLoader>
  );
};

export default DirectoryLegalEntitySawatzkyPage;
