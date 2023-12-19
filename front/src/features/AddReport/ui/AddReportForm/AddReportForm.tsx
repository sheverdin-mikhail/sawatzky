import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getWorkObjectGroup } from 'entities/WorkObjectGroup';
import { useMemo } from 'react';
import cls from './AddReportForm.module.scss';

interface AddReportFormProps {
  className?: string;
}

export const AddReportForm: React.FC<AddReportFormProps> = (props) => {
  const { className } = props;

  const workObjectsGroups = useSelector(getWorkObjectGroup.selectAll);

  const workObjectGroupOptions: SelectOptionType[] = workObjectsGroups.map((item) => ({ value: item.id, text: item.name }));

  return (
    <div className={classNames(cls.addReportForm, {}, [className])}>
      <Text className={cls.title} title="Создать новый отчет" textAlign={TextAlign.CENTER} />

      <Input className={cls.input} placeholder="Период" />
      <Select className={cls.input} placeholder="Группа объектов" options={workObjectGroupOptions} />
      <Select className={cls.input} placeholder="Объекты" />
      <Select className={cls.input} placeholder="Контрагенты" />
      <Select className={cls.input} placeholder="Заказчики" />

      <Button className={cls.btn} theme={ButtonThemes.BLUE_SOLID}>Создать</Button>
    </div>
  );
};
