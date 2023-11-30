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
import { EmployeeRoleOption } from 'features/CreateSawatzkyEmployee/model/type/createSawatzkyEmployee';
import { EmployeeRole } from 'entities/Employee';
import {
  getCreateSawatzkyEmployeeFormFio,
  getCreateSawatzkyEmployeeFormPassword,
  getCreateSawatzkyEmployeeFormPhoneNumber,
  getCreateSawatzkyEmployeeFormPosition,
  getCreateSawatzkyEmployeeFormRole, getCreateSawatzkyEmployeeFormStatus,
  getCreateSawatzkyEmployeeFormUsername,
  getCreateSawatzkyEmployeeFormWorkObject,
  getCreateSawatzkyEmployeeFormWorkObjectGroup,
  getCreateSawatzkyEmployeeFormWorkingObjects,
} from '../../model/selectors/createSawatzkyEmployeeSelectors';
import { createSawatzkyEmployeeActions } from '../../model/slice/createSawatzkyEmployeeSlice';
import cls from './CreateSawatzkyEmployeeForm.module.scss';

interface CreateSawatzkyEmployeeFormProps {
  className?: string;
}

const roles: EmployeeRoleOption[] = [
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
];

export const CreateSawatzkyEmployeeForm: React.FC<CreateSawatzkyEmployeeFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const workObjectGroup = useSelector(getCreateSawatzkyEmployeeFormWorkObjectGroup);
  const workObject = useSelector(getCreateSawatzkyEmployeeFormWorkObject);
  const workingObjects = useSelector(getCreateSawatzkyEmployeeFormWorkingObjects);
  const role = useSelector(getCreateSawatzkyEmployeeFormRole);
  const fio = useSelector(getCreateSawatzkyEmployeeFormFio);
  const phoneNumber = useSelector(getCreateSawatzkyEmployeeFormPhoneNumber);
  const username = useSelector(getCreateSawatzkyEmployeeFormUsername);
  const password = useSelector(getCreateSawatzkyEmployeeFormPassword);
  const position = useSelector(getCreateSawatzkyEmployeeFormPosition);
  const status = useSelector(getCreateSawatzkyEmployeeFormStatus);
  const workObjectGroups = useSelector(getWorkObjectGroup.selectAll);

  const onChangeWorkObjectGroup = useCallback((item: SelectOptionType) => {
    dispatch(createSawatzkyEmployeeActions.setWorkObjectGroup(+item.value));
  }, [dispatch]);

  const onChangeWorkObject = useCallback((item: SelectOptionType) => {
    dispatch(createSawatzkyEmployeeActions.setWorkObject(+item.value));
  }, [dispatch]);

  const onChangeRole = useCallback((item: SelectOptionType) => {
    dispatch(createSawatzkyEmployeeActions.setRole(item.value.toString()));
  }, [dispatch]);

  const onChangeFio = useCallback((value: string) => {
    dispatch(createSawatzkyEmployeeActions.setFio(value));
  }, [dispatch]);
  const onChangePhoneNumber = useCallback((value: string) => {
    dispatch(createSawatzkyEmployeeActions.setPhoneNumber(value));
  }, [dispatch]);
  const onChangeUsername = useCallback((value: string) => {
    dispatch(createSawatzkyEmployeeActions.setUsername(value));
  }, [dispatch]);
  const onChangePassword = useCallback((value: string) => {
    dispatch(createSawatzkyEmployeeActions.setPassword(value));
  }, [dispatch]);
  const onChangePosition = useCallback((value: string) => {
    dispatch(createSawatzkyEmployeeActions.setPosition(value));
  }, [dispatch]);

  const onChangeWorkingObjects = useCallback((items: SelectOptionType[]) => {
    dispatch(createSawatzkyEmployeeActions.setWorkingObjects(items.map((item) => +item.value)));
  }, [dispatch]);

  const onChangeStatus = useCallback((value: boolean) => {
    dispatch(createSawatzkyEmployeeActions.setStatus(value));
  }, [dispatch]);

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

  const roleOption = useMemo(() => {
    if (role) {
      return roles.find((item) => item.value === role);
    }
    return undefined;
  }, [role]);

  const workObjectOption = useMemo(() => {
    if (workObject) {
      return workObjectOptions?.find((item) => item.value === workObject);
    }
    return undefined;
  }, [workObject, workObjectOptions]);

  const workingObjectsOptions = useMemo(() => {
    if (workingObjects) {
      return workObjectOptions?.filter((item) => workingObjects.find((object) => object === item.value));
    }
    return undefined;
  }, [workingObjects, workObjectOptions]);

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

      <Button className={cls.btn} theme={ButtonThemes.BLUE_SOLID}>Создать</Button>
    </div>
  );
};
