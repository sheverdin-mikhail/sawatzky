import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { TableItemType, TableType } from 'widgets/Table';
import { useCallback, useEffect } from 'react';
import {
  CreateEmployeeModal,
  createEmployeeReducer,
  createEmployeeActions,
  getCreateEmployeeIsOpen,
} from 'features/CreateEmployee';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchWorkObjectGroupList, workObjectGroupReducer } from 'entities/WorkObjectGroup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { workObjectReducer } from 'entities/WorkObject';
import { useTable } from 'shared/lib/hooks/useTable';
import {
  fetchSawatzkyEmployeeList, getSawatzkyEmployee, sawatzkyEmployeeReducer, deleteSawatzkyEmployee,
} from 'entities/SawatzkyEmployee';
import { useSelector } from 'react-redux';
import cls from './DirectoryEmployeeSawatzkyPage.module.scss';

interface DirectoryEmployeeSawatzkyPageProps {
  className?: string;
}

const reducers: ReducersList = {
  workObjectGroup: workObjectGroupReducer,
  workObject: workObjectReducer,
  createEmployee: createEmployeeReducer,
  sawatzkyEmployee: sawatzkyEmployeeReducer,
};

const DirectoryEmployeeSawatzkyPage: React.FC<DirectoryEmployeeSawatzkyPageProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const sawatzkyEmployees = useSelector(getSawatzkyEmployee.selectAll);
  const createSawatzkyEmployeeIsOpen = useSelector(getCreateEmployeeIsOpen);

  useEffect(() => {
    dispatch(fetchWorkObjectGroupList());
    dispatch(fetchSawatzkyEmployeeList());
  }, [dispatch]);

  const onSawatzkyEmployeeFormCloseHandler = useCallback(() => {
    dispatch(createEmployeeActions.closeModal());
  }, [dispatch]);

  const tableData: TableType = {
    header: {
      id: 'ID',
      name: 'ФИО',
      status: 'Статус  ',
      position: 'Должность',
      object: 'Объект',
    },
    items: sawatzkyEmployees.map((item) => ({
      id: item.id ?? '',
      name: item.user.fio ?? '',
      status: item.status ? 'активный' : 'неактивный',
      position: item.position ?? '',
      object: item.workObject.name ?? '',
    })),
  };

  const onTableDeleteHandler = useCallback((item: TableItemType) => {
    const user = sawatzkyEmployees.find((employee) => employee.id === item.id)?.user;
    if (user) {
      dispatch(deleteSawatzkyEmployee(`${user.id}`));
    }
  }, [dispatch, sawatzkyEmployees]);

  const { Table, selectedItems } = useTable({
    data: tableData,
    onDelete: onTableDeleteHandler,
  });

  const onButtonDeleteHandler = useCallback(() => {
    if (selectedItems) {
      selectedItems.forEach((item) => {
        dispatch(deleteSawatzkyEmployee(`${item.id}`));
      });
    }
  }, [dispatch, selectedItems]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <DirectoryPageWrapper className={classNames(cls.directoryEmployeeSawatzkyPage, {}, [className])}>
        <div className={cls.buttons}>
          <Button
            helpInfo="Добавить сотрудника Sawatzky"
            onClick={() => dispatch(createEmployeeActions.openModal())}
            className={cls.button}
            theme={ButtonThemes.ICON}
          >
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить сотрудника Sawatzky" className={cls.button} onClick={onButtonDeleteHandler} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        {Table}
        <CreateEmployeeModal
          isOpen={createSawatzkyEmployeeIsOpen ?? false}
          onClose={onSawatzkyEmployeeFormCloseHandler}
          isSawatzky
        />

      </DirectoryPageWrapper>
    </DynamicModuleLoader>
  );
};

export default DirectoryEmployeeSawatzkyPage;
