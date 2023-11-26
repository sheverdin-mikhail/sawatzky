import { classNames } from 'shared/lib/classNames/classNames';
import { Checkbox, CheckboxThemes } from 'shared/ui/Checkbox/Checkbox';
import { useCallback, MouseEvent } from 'react';
import cls from './MultiselectItem.module.scss';

interface MultiselectItemProps {
  className?: string;
  id: string;
  text?: string;
  onChange?: (item: any) => void;
  checked?: boolean;
}

export const MultiselectItem: React.FC<MultiselectItemProps> = (props) => {
  const {
    id, text, onChange, checked,
  } = props;

  const onToggleChecked = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onChange?.({ id, value: !checked });
  }, [id, checked, onChange]);

  return (
    <li
      key={id}
      className={classNames(cls.optionCheckbox, { [cls.checkedText]: checked }, [])}
      onClick={(e) => onToggleChecked(e)}
    >
      <Checkbox className={cls.checkbox} id={id} theme={CheckboxThemes.BLUE} checked={checked} />
      {text}
    </li>
  );
};
