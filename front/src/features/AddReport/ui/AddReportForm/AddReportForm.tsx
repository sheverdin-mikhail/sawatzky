import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Select } from 'shared/ui/Select/Select';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import cls from './AddReportForm.module.scss';

interface AddReportFormProps {
  className?: string;
}

export const AddReportForm: React.FC<AddReportFormProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.addReportForm, {}, [className])}>
      <Text className={cls.title} title="Создать новый отчет" textAlign={TextAlign.CENTER} />

      <Input className={cls.input} placeholder="Период" />
      <Select className={classNames((cls.input), {}, [cls.select])} placeholder="Группа объектов" />
      <Select className={classNames((cls.input), {}, [cls.select])} placeholder="Объекты" />
      <Select className={classNames((cls.input), {}, [cls.select])} placeholder="Контрагенты" />
      <Select className={classNames((cls.input), {}, [cls.select])} placeholder="Заказчики" />

      <Button className={cls.btn} theme={ButtonThemes.BLUE_SOLID}>Создать</Button>
    </div>
  );
};
