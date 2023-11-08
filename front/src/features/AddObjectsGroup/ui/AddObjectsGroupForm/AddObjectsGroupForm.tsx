import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import cls from './AddObjectsGroupForm.module.scss';

interface AddObjectsGroupFormProps {
	className?: string;
}

export const AddObjectsGroupForm: React.FC<AddObjectsGroupFormProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.addObjectsGroupForm, {}, [className])}>
      <Text title="Создать группу объектов" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input placeholder="Наименование группы" className={cls.input} />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button}>Сохранить</Button>
        <Button theme={ButtonThemes.BLUE_BORDER} className={cls.button}>Отмена</Button>
      </div>
    </div>
  );
};
