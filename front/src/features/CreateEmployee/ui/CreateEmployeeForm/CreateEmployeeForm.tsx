import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { DocList } from 'widgets/DocList';
import { Document } from 'entities/Document';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getLegalEntity } from 'entities/LegalEntity';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { EmployeeRole } from 'entities/Employee';
import { Switch } from 'shared/ui/Switch/Switch';
import {
  getCreateEmployeeFormData,
  getCreateEmployeeFormLegalEntity,
  getCreateEmployeeFormRole,
  getCreateEmployeeFormStatus,
  getCreateEmployeeUser,
  getCreateEmployeeUserFormFio,
  getCreateEmployeeUserFormPassword,
  getCreateEmployeeUserFormPhoneNumber,
  getCreateEmployeeUserFormUsername,
} from '../../model/selectors/createEmployeeSelectors';
import { createEmployeeActions } from '../../model/slice/createEmployeeSlice';
import { EmployeeRoleOption } from '../../model/type/createEmployee';
import { createEmployee } from '../../model/services/createEmployee';
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
  const legalEntities = useSelector(getLegalEntity.selectAll);
  const legalEntity = useSelector(getCreateEmployeeFormLegalEntity);
  const fio = useSelector(getCreateEmployeeUserFormFio);
  const phoneNumber = useSelector(getCreateEmployeeUserFormPhoneNumber);
  const username = useSelector(getCreateEmployeeUserFormUsername);
  const password = useSelector(getCreateEmployeeUserFormPassword);
  const role = useSelector(getCreateEmployeeFormRole);
  const status = useSelector(getCreateEmployeeFormStatus);

  const formData = useSelector(getCreateEmployeeFormData);
  const user = useSelector(getCreateEmployeeUser);

  const onChangeLegalEntity = useCallback((item: SelectOptionType) => {
    dispatch(createEmployeeActions.setLegalEntity(+item.value));
  }, [dispatch]);
  const onChangeStatus = useCallback((value: boolean) => {
    dispatch(createEmployeeActions.setStatus(value));
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

  const onSubmitForm = useCallback(() => {
    if (formData) {
      dispatch(createEmployee({ ...formData, user }));
    }
  }, [dispatch, formData, user]);

  const legalEntityOptions: SelectOptionType[] | undefined = useMemo(() => (
    legalEntities.map((item) => ({ value: item.id ?? '', text: item.name ?? '' }
    ))), [legalEntities]);

  const legalEntityOption = useMemo(() => {
    if (legalEntity) {
      return legalEntityOptions?.find((item) => item.value === legalEntity);
    }
    return undefined;
  }, [legalEntityOptions, legalEntity]);

  const roleOption = useMemo(() => {
    if (role) {
      return roles.find((item) => item.value === role);
    }
    return undefined;
  }, [role]);

  const docs: Document[] = [];

  return (
    <div className={classNames(cls.CreateEmployeeForm, {}, [className])}>
      <Text className={cls.title} textAlign={TextAlign.CENTER} title="Создать Представителя заказчика" />

      <Select
        className={classNames(cls.input, {}, [cls.select])}
        placeholder="Компания"
        value={legalEntityOption}
        options={legalEntityOptions}
        onChange={onChangeLegalEntity}
      />
      <Input className={cls.input} placeholder="ФИО" onChange={onChangeFio} value={fio ?? ''} />
      <Input className={cls.input} placeholder="Телефон" onChange={onChangePhoneNumber} value={phoneNumber ?? ''} />
      <Input className={cls.input} placeholder="Логин (ivanov22)" onChange={onChangeUsername} value={username ?? ''} />
      <Input className={cls.input} placeholder="Пароль (Ivanov_22)" onChange={onChangePassword} value={password ?? ''} />
      <Select
        className={classNames(cls.input, {}, [cls.select])}
        placeholder="Роль"
        options={roles}
        value={roleOption ?? undefined}
        onChange={onChangeRole}
      />
      {/* <Input
        className={cls.input}
        placeholder="Номер доверенности"
      /> */}
      <Switch className={cls.switch} id="status" label="Статус сотрудника" checked={status ?? false} onChange={onChangeStatus} />

      {/* <Button
        className={cls.addBtn}
        theme={ButtonThemes.CLEAR_BLUE}
      >+ Добавить доверенность
      </Button> */}

      {docs && (
        <DocList className={cls.docList} acts="acts" docs={docs} modal />
      )}
      <Button
        className={cls.btn}
        theme={ButtonThemes.BLUE_SOLID}
        onClick={onSubmitForm}
      >Создать
      </Button>
    </div>
  );
};
