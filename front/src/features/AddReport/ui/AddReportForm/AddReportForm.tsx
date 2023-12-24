import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getWorkObjectGroup } from 'entities/WorkObjectGroup';
import { useCallback, useMemo } from 'react';
import {
  getAddReportFormData, getAddReportFormEmployee, getAddReportFormLegalEntity, getAddReportFormPeriod, getAddReportFormWorkObject, getAddReportFormWorkObjectGroup,
} from 'features/AddReport/model/selectors/addReportSelectors';
import { addReportActions } from 'features/AddReport/model/slice/addReportSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLegalEntity } from 'entities/LegalEntity';
import { getEmployee } from 'entities/Employee';
import cls from './AddReportForm.module.scss';

interface AddReportFormProps {
  className?: string;
}

export const AddReportForm: React.FC<AddReportFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const formData = useSelector(getAddReportFormData);

  const workObjectsGroups = useSelector(getWorkObjectGroup.selectAll);
  const legalEntities = useSelector(getLegalEntity.selectAll);
  const employees = useSelector(getEmployee.selectAll);
  const workObjectsGroup = useSelector(getAddReportFormWorkObjectGroup);
  const workObject = useSelector(getAddReportFormWorkObject);
  const legalEntity = useSelector(getAddReportFormLegalEntity);
  const employee = useSelector(getAddReportFormEmployee);
  const period = useSelector(getAddReportFormPeriod);

  const onChangeWorkObjectGroup = useCallback((item: SelectOptionType) => {
    dispatch(addReportActions.setWorkObjectsGroup(+item.value));
  }, [dispatch]);

  const onChangeWorkObject = useCallback((item: SelectOptionType) => {
    dispatch(addReportActions.setWorkObject(+item.value));
  }, [dispatch]);

  const onChangeLegalEntity = useCallback((item: SelectOptionType) => {
    dispatch(addReportActions.setLegalEntity(+item.value));
  }, [dispatch]);

  const onChangeEmployee = useCallback((item: SelectOptionType) => {
    dispatch(addReportActions.setEmployee(+item.value));
  }, [dispatch]);

  const workObjectGroupOptions: SelectOptionType[] = workObjectsGroups.map((item) => ({ value: item.id, text: item.name }));

  const workObjectGroupOption = useMemo(() => {
    if (workObjectsGroup) {
      return workObjectGroupOptions?.find((item) => item.value === workObjectsGroup);
    }
    return undefined;
  }, [workObjectGroupOptions, workObjectsGroup]);

  const workObjectOptions = useMemo(() => {
    const workObjects = workObjectsGroups.find((item) => item.id === workObjectsGroup)?.workObjects;
    if (workObjects) {
      return workObjects?.map((item) => ({
        value: item.id,
        text: item.name,
      }));
    }
    return undefined;
  }, [workObjectsGroups, workObjectsGroup]);

  const workObjectOption = useMemo(() => {
    if (workObject) {
      return workObjectOptions?.find((item) => item.value === workObject);
    }
    return undefined;
  }, [workObject, workObjectOptions]);

  const legalEntityOptions: SelectOptionType[] | undefined = useMemo(() => (
    legalEntities.map((item) => ({ value: item.id ?? '', text: item.name ?? '' }
    ))), [legalEntities]);

  const legalEntityOption = useMemo(() => {
    if (legalEntity) {
      return legalEntityOptions?.find((item) => item.value === legalEntity);
    }
    return undefined;
  }, [legalEntityOptions, legalEntity]);

  const employeeOptions: SelectOptionType[] | undefined = useMemo(() => (
    employees.map((item) => ({ value: item.id ?? '', text: item.user.fio ?? '' }
    ))), [employees]);

  const employeeOption = useMemo(() => {
    if (employee) {
      return employeeOptions?.find((item) => item.value === employee);
    }
    return undefined;
  }, [employeeOptions, employee]);

  return (
    <div className={classNames(cls.addReportForm, {}, [className])}>
      <Text className={cls.title} title="Создать новый отчет" textAlign={TextAlign.CENTER} />

      <Input
        className={cls.input}
        placeholder="Период"
        onChange={(value) => dispatch(addReportActions.setPeriod(value))}
        value={period}
      />
      <Select
        className={cls.input}
        placeholder="Группа объектов"
        onChange={onChangeWorkObjectGroup}
        options={workObjectGroupOptions}
        value={workObjectGroupOption}
      />
      <Select
        className={cls.input}
        placeholder="Объекты"
        onChange={onChangeWorkObject}
        options={workObjectOptions}
        value={workObjectOption}
      />
      <Select
        className={cls.input}
        placeholder="Контрагенты"
        onChange={onChangeLegalEntity}
        options={legalEntityOptions}
        value={legalEntityOption}
      />
      <Select
        className={cls.input}
        placeholder="Заказчики"
        onChange={onChangeEmployee}
        options={employeeOptions}
        value={employeeOption}
      />

      <Button className={cls.btn} theme={ButtonThemes.BLUE_SOLID}>Создать</Button>
    </div>
  );
};
