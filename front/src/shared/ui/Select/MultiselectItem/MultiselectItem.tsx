import { classNames } from 'shared/lib/classNames/classNames';
import { Checkbox, CheckboxThemes } from 'shared/ui/Checkbox/Checkbox';
import { useCallback, useState, MouseEvent } from 'react';
import cls from './MultiselectItem.module.scss';

interface MultiselectItemProps {
  className?: string;
  id: string;
  text?: string;
}

export const MultiselectItem: React.FC<MultiselectItemProps> = (props) => {
  const { id, text } = props;

  const [isChecked, setIsChecked] = useState(false);

  const onToggleChecked = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsChecked((prev) => !prev);
  }, []);

  return (
    <li
      key={id}
      className={classNames(cls.optionCheckbox, { [cls.checkedText]: isChecked }, [])}
      onClick={(e) => onToggleChecked(e)}
    >
      <Checkbox className={cls.checkbox} id={id} theme={CheckboxThemes.BLUE} checked={isChecked} />
      {text}
    </li>
  );
};
