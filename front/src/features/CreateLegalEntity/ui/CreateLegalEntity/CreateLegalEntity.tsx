import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import cls from './CreateLegalEntity.module.scss';

interface CreateLegalEntityProps {
	className?: string;
}

export const CreateLegalEntity: React.FC<CreateLegalEntityProps> = (props) => {
  const { className } = props;

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
    <div className={classNames(cls.createLegalEntity, {}, [className])}>
      <Text title="Создать Контрагента (Юр. лиц Заказчиков)" textAlign={TextAlign.CENTER} className={cls.title} />
      <div className={cls.body}>
        <div className={cls.column}>
          <Select className={cls.input} placeholder="Группа объектов" options={workObjectGropsOptions} />
          <Select className={cls.input} placeholder="Объект" options={workObjectsOptions} />
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
        <div className={cls.column} />
      </div>
    </div>
  );
};
