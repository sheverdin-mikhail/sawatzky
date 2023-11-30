import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { Table, TableType } from 'widgets/Table';
import { useCallback, useEffect, useState } from 'react';
import { CreateSawatzkyEmployeeModal, createSawatzkyEmployeeReducer } from 'features/CreateSawatzkyEmployee';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchWorkObjectGroupList, workObjectGroupReducer } from 'entities/WorkObjectGroup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { workObjectReducer } from 'entities/WorkObject';
import cls from './DirectoryEmployeeSawatzkyPage.module.scss';

interface DirectoryEmployeeSawatzkyPageProps {
  className?: string;
}

const reducers: ReducersList = {
  workObjectGroup: workObjectGroupReducer,
  workObject: workObjectReducer,
  createSawatzkyEmployee: createSawatzkyEmployeeReducer,
};

const DirectoryEmployeeSawatzkyPage: React.FC<DirectoryEmployeeSawatzkyPageProps> = (props) => {
  const { className } = props;
  const [legalEntityFormIsOpen, setLegalEntityFormIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkObjectGroupList());
  }, [dispatch]);

  const onLegalEntityFormCloseHandler = useCallback(() => {
    setLegalEntityFormIsOpen(false);
  }, []);

  const tableData: TableType = {
    header: {
      id: 'ID',
      name: 'ФИО',
      status: 'Статус  ',
      position: 'Должность',
      object: 'Объект',
    },
    items: [
    ],
  };

  return (
    <DynamicModuleLoader reducers={reducers}>
      <DirectoryPageWrapper className={classNames(cls.directoryEmployeeSawatzkyPage, {}, [className])}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить сотрудника Sawatzky" onClick={() => setLegalEntityFormIsOpen(true)} className={cls.button} theme={ButtonThemes.ICON}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить сотрудника Sawatzky" className={cls.button} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        <Table data={tableData} />
        <CreateSawatzkyEmployeeModal
          isOpen={legalEntityFormIsOpen}
          onClose={onLegalEntityFormCloseHandler}
        />

      </DirectoryPageWrapper>
    </DynamicModuleLoader>
  );
};

export default DirectoryEmployeeSawatzkyPage;
