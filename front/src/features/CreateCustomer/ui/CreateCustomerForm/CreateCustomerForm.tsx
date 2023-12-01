import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Logo } from 'shared/ui/Logo/Logo';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Document } from 'entities/Document';
import { DocList } from 'widgets/DocList';
import cls from './CreateCustomerForm.module.scss';

interface CreateCustomerFormProps {
  className?: string;
}

export const CreateCustomerForm: React.FC<CreateCustomerFormProps> = (props) => {
  const { className } = props;

  const companies = [
    {
      id: '1',
      name: 'Компания 1',
    },
    {
      id: '2',
      name: 'Компания 2',
    },
  ];
  const companiesOptions: SelectOptionType[] = companies.map((item) => ({ value: item.id, text: item.name }));

  const roles = [
    {
      id: '1',
      code: 'Исполнитель',
    },
    {
      id: '2',
      code: 'Заказчик',
    },
  ];
  const rolesOptions: SelectOptionType[] = roles.map((item) => ({
    value: item.id,
    text: item.code,
  }));

  const docs: Document[] = [
    {
      id: '1', name: 'Доверенность 3.doсx', createdAt: '12.05.23', docType: 'just', fileUrl: 'www.google.com',
    },
    {
      id: '2', name: 'Доверенность 2.doсx', createdAt: '12.05.23', docType: 'just', fileUrl: 'www.google.com',
    },
    {
      id: '3', name: 'Доверенность 1.doсx', createdAt: '12.05.23', docType: 'just', fileUrl: 'www.google.com',
    },
  ];

  return (
    <div className={classNames(cls.createCustomerForm, {}, [className])}>
      <Logo width={102} />
      <Text className={cls.title} textAlign={TextAlign.CENTER} title="Создать Представителя заказчика" />

      <Select className={classNames(cls.input, {}, [cls.select])} placeholder="Компания" options={companiesOptions} />
      <Input className={cls.input} placeholder="ФИО" />
      <Select className={classNames(cls.input, {}, [cls.select])} placeholder="Роль" options={rolesOptions} />
      <Input className={cls.input} placeholder="Номер доверенности" />

      <Button className={cls.addBtn} theme={ButtonThemes.CLEAR_BLUE}>+ Добавить доверенность</Button>

      {docs && (
        <DocList className={cls.docList} acts="acts" docs={docs} modal />
      )}
      <Button className={cls.btn} theme={ButtonThemes.BLUE_SOLID}>Создать</Button>
    </div>
  );
};
