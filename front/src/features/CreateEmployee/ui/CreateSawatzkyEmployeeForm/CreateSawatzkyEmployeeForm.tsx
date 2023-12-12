import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Input } from 'shared/ui/Input/Input';
import { Switch } from 'shared/ui/Switch/Switch';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import {
  useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { getWorkObjectGroup } from 'entities/WorkObjectGroup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { EmployeeRole } from 'entities/Employee';
import { EmployeeRoleOption } from '../../model/type/createEmployee';
import {
  getCreateEmployeeSawatzkyFormData,
  getCreateEmployeeSawatzkyFormPosition,
  getCreateEmployeeSawatzkyFormRole,
  getCreateEmployeeSawatzkyFormStatus,
  getCreateEmployeeSawatzkyFormWorkObject,
  getCreateEmployeeSawatzkyFormWorkObjectGroup,
  getCreateEmployeeSawatzkyFormWorkingObjects,
  getCreateEmployeeUser,
  getCreateEmployeeUserFormFio,
  getCreateEmployeeUserFormPassword,
  getCreateEmployeeUserFormPhoneNumber,
  getCreateEmployeeUserFormUsername,
} from '../../model/selectors/createEmployeeSelectors';
import { createEmployeeActions } from '../../model/slice/createEmployeeSlice';
import cls from './CreateSawatzkyEmployeeForm.module.scss';
import { createSawatzkyEmployee } from '../../model/services/createSawatzkyEmployee';

interface CreateSawatzkyEmployeeFormProps {
  className?: string;
}

export const CreateSawatzkyEmployeeForm: React.FC<CreateSawatzkyEmployeeFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const workObjectGroup = useSelector(getCreateEmployeeSawatzkyFormWorkObjectGroup);
  const workObject = useSelector(getCreateEmployeeSawatzkyFormWorkObject);
  const workingObjects = useSelector(getCreateEmployeeSawatzkyFormWorkingObjects);
  const role = useSelector(getCreateEmployeeSawatzkyFormRole);
  const fio = useSelector(getCreateEmployeeUserFormFio);
  const phoneNumber = useSelector(getCreateEmployeeUserFormPhoneNumber);
  const username = useSelector(getCreateEmployeeUserFormUsername);
  const password = useSelector(getCreateEmployeeUserFormPassword);
  const position = useSelector(getCreateEmployeeSawatzkyFormPosition);
  const status = useSelector(getCreateEmployeeSawatzkyFormStatus);
  const formData = useSelector(getCreateEmployeeSawatzkyFormData);
  const workObjectGroups = useSelector(getWorkObjectGroup.selectAll);
  const user = useSelector(getCreateEmployeeUser);

  const onChangeWorkObjectGroup = useCallback((item: SelectOptionType) => {
    dispatch(createEmployeeActions.setWorkObjectGroup(+item.value));
  }, [dispatch]);

  const onChangeWorkObject = useCallback((item: SelectOptionType) => {
    dispatch(createEmployeeActions.setWorkObject(+item.value));
  }, [dispatch]);

  const onChangeRole = useCallback((item: SelectOptionType) => {
    dispatch(createEmployeeActions.setRole(item.value.toString()));
  }, [dispatch]);

  const onChangeFio = useCallback((value: string) => {
    dispatch(createEmployeeActions.setFio(value));
  }, [dispatch]);
  const onChangePhoneNumber = useCallback((value: string) => {
    dispatch(createEmployeeActions.setPhoneNumber(value));
  }, [dispatch]);
  const onChangeUsername = useCallback((value: string) => {
    dispatch(createEmployeeActions.setUsername(value));
  }, [dispatch]);
  const onChangePassword = useCallback((value: string) => {
    dispatch(createEmployeeActions.setPassword(value));
  }, [dispatch]);
  const onChangePosition = useCallback((value: string) => {
    dispatch(createEmployeeActions.setPosition(value));
  }, [dispatch]);

  const onChangeWorkingObjects = useCallback((items: SelectOptionType[]) => {
    dispatch(createEmployeeActions.setWorkingObjects(items.map((item) => +item.value)));
  }, [dispatch]);

  const onChangeStatus = useCallback((value: boolean) => {
    dispatch(createEmployeeActions.setStatus(value));
  }, [dispatch]);

  const onSubmitForm = useCallback(() => {
    if (formData) {
      dispatch(createSawatzkyEmployee({ ...formData, user }));
    }
  }, [dispatch, formData, user]);

  const roles: EmployeeRoleOption[] = useMemo(() => {
    const roles = [
      {
        value: EmployeeRole.DISPATCHER,
        text: 'Диспетчер',
      },
      {
        value: EmployeeRole.PERFORMER,
        text: 'Исполнитель',
      },
      {
        value: EmployeeRole.DISPATCHER_PERFORMER,
        text: 'Диспетчер/Исполнитель',
      },
      {
        value: EmployeeRole.ADMIN,
        text: 'Администратор',
      },
    ];
    return roles;
  }, []);

  const workObjectOptions = useMemo(() => {
    const workObjects = workObjectGroups.find((item) => item.id === workObjectGroup)?.workObjects;
    if (workObjects) {
      return workObjects?.map((item) => ({
        value: item.id,
        text: item.name,
      }));
    }
    return undefined;
  }, [workObjectGroups, workObjectGroup]);
  const workObjectGroupOptions: SelectOptionType[] = workObjectGroups.map((item) => ({ value: item.id, text: item.name }));

  const workingObjectsOptions = useMemo(() => {
    if (workingObjects) {
      return workObjectOptions?.filter((item) => workingObjects.find((object) => object === item.value));
    }
    return undefined;
  }, [workingObjects, workObjectOptions]);

  const roleOption = useMemo(() => {
    if (role) {
      return roles.find((item) => item.value === role);
    }
    return undefined;
  }, [roles, role]);

  const workObjectOption = useMemo(() => {
    if (workObject) {
      return workObjectOptions?.find((item) => item.value === workObject);
    }
    return undefined;
  }, [workObject, workObjectOptions]);

  const workObjectGroupOption = useMemo(() => {
    if (workObjectGroup) {
      return workObjectGroupOptions?.find((item) => item.value === workObjectGroup);
    }
    return undefined;
  }, [workObjectGroupOptions, workObjectGroup]);

  return (
    <div className={classNames(cls.addEmployeeForm, {}, [className])}>
      <Text title="Создать Сотрудника Sawatzky" textAlign={TextAlign.CENTER} className={cls.title} />
      <Select
        className={classNames(cls.input, {}, [cls.select])}
        onChange={onChangeWorkObjectGroup}
        value={workObjectGroupOption}
        placeholder="Группа объектов"
        options={workObjectGroupOptions}
      />
      { workObjectGroup && (
        <Select
          className={classNames(cls.input, {}, [cls.select])}
          placeholder="Объект"
          options={workObjectOptions}
          onChange={onChangeWorkObject}
          value={workObjectOption}
        />
      ) }
      <Input className={cls.input} placeholder="ФИО" onChange={onChangeFio} value={fio} />
      <Input className={cls.input} placeholder="Телефон" onChange={onChangePhoneNumber} value={phoneNumber} />
      <Input className={cls.input} placeholder="Логин (ivanov22)" onChange={onChangeUsername} value={username} />
      <Input className={cls.input} placeholder="Пароль (Ivanov_22)" onChange={onChangePassword} value={password} />
      <Input className={cls.input} placeholder="Должность" onChange={onChangePosition} value={position} />
      {
        workObject && (
          <Select
            className={cls.input}
            placeholder="Роль"
            options={roles}
            value={roleOption ?? undefined}
            onChange={onChangeRole}
          />
        )
      }

      {
        roleOption && (
          <>
            <p className={cls.subtitle}>{roleOption.text} объектов</p><Select
              className={classNames(cls.input, {}, [cls.select])}
              placeholder="Выбор нескольких объектов"
              options={workObjectOptions}
              selected={workingObjectsOptions}
              onMultiChange={onChangeWorkingObjects}
              multi
            />
          </>
        )
      }

      <Switch className={cls.switch} id="status" label="Статус сотрудника" checked={status ?? false} onChange={onChangeStatus} />

      <Button className={cls.btn} theme={ButtonThemes.BLUE_SOLID} onClick={onSubmitForm}>Создать</Button>
    </div>
  );
};
