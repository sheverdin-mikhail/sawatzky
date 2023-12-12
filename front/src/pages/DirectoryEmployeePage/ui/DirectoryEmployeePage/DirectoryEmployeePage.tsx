import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { TableItemType, TableType } from 'widgets/Table';
import { useCallback, useEffect } from 'react';
import { useTable } from 'shared/lib/hooks/useTable';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  EmployeeRoleValue,
  deleteEmployee,
  employeeReducer,
  fetchEmployeeList,
  getEmployee,
} from 'entities/Employee';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchLegalEntityList, legalEntityReducer } from 'entities/LegalEntity';
import {
  CreateEmployeeModal,
  createEmployeeActions,
  createEmployeeReducer,
  getCreateEmployeeIsOpen,
} from 'features/CreateEmployee';
import cls from './DirectoryEmployeePage.module.scss';

interface DirectoryEmployeePageProps {
  className?: string;
}

const reducers: ReducersList = {
  employee: employeeReducer,
  createEmployee: createEmployeeReducer,
  legalEntity: legalEntityReducer,
};

const DirectoryEmployeePage: React.FC<DirectoryEmployeePageProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const employees = useSelector(getEmployee.selectAll);
  const createEmployeeFormIsOpen = useSelector(getCreateEmployeeIsOpen);

  useEffect(() => {
    dispatch(fetchEmployeeList());
    dispatch(fetchLegalEntityList());
  }, [dispatch]);

  const onEmployeeFormCloseHandler = useCallback(() => {
    dispatch(createEmployeeActions.closeModal());
  }, [dispatch]);

  const onTableDeleteHandler = useCallback((item: TableItemType) => {
    const user = employees.find((employee) => employee.id === item.id)?.user;
    if (user) {
      dispatch(deleteEmployee(`${user.id}`));
    }
  }, [dispatch, employees]);

  const tableData: TableType = {
    header: {
      id: 'ID',
      name: 'ФИО',
      company: 'Компания  ',
      phone: 'Моб. Телефон',
      role: 'Роль',
    },
    items: employees.map((item) => ({
      id: item.id ?? '',
      name: item.user.fio ?? '',
      company: item.legalEntity.name ?? '',
      phone: item.user.phoneNumber ?? '',
      role: EmployeeRoleValue[item.role] ?? '',
    })),
  };

  const { Table } = useTable({
    data: tableData,
    onDelete: onTableDeleteHandler,
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <DirectoryPageWrapper className={classNames(cls.directoryEmployeePage, {}, [className])}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить представителя заказчика" onClick={() => dispatch(createEmployeeActions.openModal())} className={cls.button} theme={ButtonThemes.ICON}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить представителя заказчика" className={cls.button} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        {Table}
        <CreateEmployeeModal
          onClose={onEmployeeFormCloseHandler}
          isOpen={createEmployeeFormIsOpen ?? false}
          className={cls.form}
        />

      </DirectoryPageWrapper>
    </DynamicModuleLoader>
  );
};

export default DirectoryEmployeePage;
