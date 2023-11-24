import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Input } from 'shared/ui/Input/Input';
import { Switch } from 'shared/ui/Switch/Switch';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useCallback, useState } from 'react';
import cls from './CreateEmployeeForm.module.scss';

interface CreateEmployeeFormProps {
  className?: string;
}

export const CreateEmployeeForm: React.FC<CreateEmployeeFormProps> = (props) => {
  const { className } = props;

  const [isChecked, setIsChecked] = useState(false);

  const onToggleChecked = useCallback(() => {
    setIsChecked((prev) => !prev);
  }, []);

  const workObjectGrops = [
    {
      id: '15',
      name: 'Группа объектов № 15',
    },
    {
      id: '16',
      name: 'Группа объектов № 16',
    },
  ];
  const workObjectGropsOptions: SelectOptionType[] = workObjectGrops.map((item) => ({ value: item.id, text: item.name }));

  const workObjects = [
    {
      id: '1',
      code: '12345',
    },
    {
      id: '2',
      code: '12346',
    },
  ];
  const workObjectsOptions: SelectOptionType[] = workObjects.map((item) => ({
    value: item.id,
    text: item.code,
  }));

  return (
    <div className={classNames(cls.addEmployeeForm, {}, [className])}>
      <Text title="Создать Сотрудника Sawatzky" textAlign={TextAlign.CENTER} className={cls.title} />
      <Select className={classNames(cls.input, {}, [cls.select])} placeholder="Группа объектов" options={workObjectGropsOptions} />
      <Select className={classNames(cls.input, {}, [cls.select])} placeholder="Объект" options={workObjectsOptions} />
      <Input className={cls.input} placeholder="ФИО" />
      <Input className={cls.input} placeholder="Должность" />

      <p className={cls.subtitle}>Диспетчер объектов</p>
      <Select className={classNames(cls.input, {}, [cls.select])} placeholder="Выбор нескольких объектов" options={workObjectsOptions} />

      <Switch className={cls.switch} id="status" label="Статус сотрудника" checked={isChecked} onChange={onToggleChecked} />

      <Button className={cls.btn} theme={ButtonThemes.BLUE_SOLID}>Создать</Button>
    </div>
  );
};
