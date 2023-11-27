import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Input } from 'shared/ui/Input/Input';
import { Switch } from 'shared/ui/Switch/Switch';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import {
  useCallback, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { getWorkObjectGroup } from 'entities/WorkObjectGroup';
import {
  getCreateEmployeeFormFio,
  getCreateEmployeeFormRole,
  getCreateEmployeeFormStatus,
  getCreateEmployeeFormWorkObject,
  getCreateEmployeeFormWorkObjectGroup,
  getCreateEmployeeFormWorkingObjects,
} from 'features/CreateEmployee/model/selectors/createEmployeeSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { EmployeeRoleOption } from 'features/CreateEmployee/model/type/createEmployee';
import { EmployeeRole } from 'entities/Employee';
import { createEmployeeActions } from '../../model/slice/createEmployeeSlice';
import cls from './CreateEmployeeForm.module.scss';

interface CreateEmployeeFormProps {
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

export const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const workObjectGroup = useSelector(getCreateEmployeeFormWorkObjectGroup);
  const workObject = useSelector(getCreateEmployeeFormWorkObject);
  const workingObjects = useSelector(getCreateEmployeeFormWorkingObjects);
  const role = useSelector(getCreateEmployeeFormRole);
  const fio = useSelector(getCreateEmployeeFormFio);
  const status = useSelector(getCreateEmployeeFormStatus);
  const workObjectGroups = useSelector(getWorkObjectGroup.selectAll);

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

  const onChangeWorkingObjects = useCallback((items: SelectOptionType[]) => {
    dispatch(createEmployeeActions.setWorkingObjects(items.map((item) => +item.value)));
  }, [dispatch]);

  const onChangeStatus = useCallback((value: boolean) => {
    dispatch(createEmployeeActions.setStatus(value));
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
