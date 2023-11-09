import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import cls from './AddObjectForm.module.scss';

interface AddObjectFormProps {
	className?: string;
}

export const AddObjectForm: React.FC<AddObjectFormProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.addObjectForm, {}, [className])}>
      <Text title="Создать объект" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input placeholder="Код объекта" className={cls.input} />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button}>Сохранить</Button>
        <Button theme={ButtonThemes.BLUE_BORDER} className={cls.button}>Отмена</Button>
      </div>
    </div>
  );
};
