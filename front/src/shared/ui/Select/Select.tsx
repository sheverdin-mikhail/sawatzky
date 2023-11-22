import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { ReactComponent as CloseIcon } from 'shared/assets/icons/close-icon.svg';
import cls from './Select.module.scss';
import { Button, ButtonThemes } from '../Button/Button';
import { MultiselectItem } from './MultiselectItem/MultiselectItem';

interface SelectProps {
  className?: string;
  options?: SelectOptionType[];
  placeholder?: string;
  onChange?: (value: SelectOptionType) => void;
  value?: SelectOptionType;
  multi?: boolean;
  selected?: SelectOptionType[];
}

export interface SelectOptionType {
  value: string;
  text: string;
}

export const Select: React.FC<SelectProps> = (props) => {
  const {
    className, placeholder, options, onChange, multi, selected,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: null, text: placeholder ?? 'Выберите опцию' });

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    onChange?.(option);
  };

  return (
    <div
      className={classNames(cls.select, {
        [cls.open]: isOpen,
      }, [className])}
      onClick={toggleSelect}
    >
      {multi ? (
        <div>
          {selected?.length === 0
            ? <span className={cls.selectedItem}>{selectedOption.text}</span>
            : (
              <div className={cls.selectedList}>
                {selected?.map((item) => (
                  <div
                    className={cls.selected}
                    key={item.value}
                  >
                    {item.text}
                    <Button theme={ButtonThemes.CLEAR}><CloseIcon /></Button>
                  </div>
                ))}
                {/* указать при какой именно длине массива выводить этот спан */}
                <span className={cls.more}>ещё</span>
              </div>
            )}
          <ul className={cls.optionsList}>
            {
              options?.map((option) => (
                <MultiselectItem
                  key={option.value}
                  id={option.value}
                  text={option.text}
                />
              ))
            }
          </ul>
        </div>
      ) : (
        <div>
          <span className={cls.selectedItem}>{selectedOption.text}</span>
          <ul className={cls.optionsList}>
            {
              options?.map((option) => (
                <li
                  key={option.value}
                  className={cls.option}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
};
