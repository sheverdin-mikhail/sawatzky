import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { useSelector } from 'react-redux';
import { getWorkObjectGroup } from 'entities/WorkObjectGroup';
import { useCallback, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getCreateLegalEntityFormWorkObject,
  getCreateLegalEntityFormWorkObjectGroup,
} from '../../model/selectors/createLegalEntitySelectors';
import { createLegalEntityActions } from '../../model/slice/createLegalEntitySlice';
import cls from './CreateLegalEntitySawatzkyForm.module.scss';

interface CreateLegalEntitySawatzkyFormProps {
	className?: string;
}

export const CreateLegalEntitySawatzkyForm: React.FC<CreateLegalEntitySawatzkyFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const workObjectGroup = useSelector(getCreateLegalEntityFormWorkObjectGroup);
  const workObject = useSelector(getCreateLegalEntityFormWorkObject);

  const workObjectGroups = useSelector(getWorkObjectGroup.selectAll);

  const onChangeWorkObjectGroup = useCallback((item: SelectOptionType) => {
    dispatch(createLegalEntityActions.setWorkObjectGroup(+item.value));
  }, [dispatch]);

  const onChangeWorkObject = useCallback((item: SelectOptionType) => {
    dispatch(createLegalEntityActions.setWorkObject(+item.value));
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
    <div className={classNames(cls.createLegalEntitySawatzkyForm, {}, [className])}>
      <Text title="Создать Юр. лицо Sawatzky" textAlign={TextAlign.CENTER} className={cls.title} />
      <Select className={cls.input} placeholder="Группа объектов" onChange={onChangeWorkObjectGroup} options={workObjectGroupOptions} value={workObjectGroupOption} />
      {
        workObjectGroup && <Select className={cls.input} onChange={onChangeWorkObject} placeholder="Объект" options={workObjectOptions} value={workObjectOption} />
      }
      <Input placeholder="Название" className={cls.input} />
      <Input placeholder="Руководитель" className={cls.input} />
      <Input placeholder="Юридический адрес" className={cls.input} />
      <Input placeholder="Фактический адрес" className={cls.input} />
      <Input placeholder="Телефон" className={cls.input} />
      <Input placeholder="E-mail" className={cls.input} />
      <Input placeholder="ИНН/КПП" className={cls.input} />
      <Input placeholder="Расчётный счёт" className={cls.input} />
      <Input placeholder="Корреспондентский счёт" className={cls.input} />
      <Input placeholder="Банк" className={cls.input} />
      <Input placeholder="БИК" className={cls.input} />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button}>Создать</Button>
      </div>
    </div>
  );
};
