import { classNames } from 'shared/lib/classNames/classNames';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ReactComponent as CloseIcon } from 'shared/assets/icons/close-icon.svg';
import cls from './Select.module.scss';
import { Button, ButtonThemes } from '../Button/Button';
import { MultiselectItem } from './MultiselectItem/MultiselectItem';

interface SelectProps {
  className?: string;
  options?: SelectOptionType[];
  placeholder?: string;
  onChange?: (value: SelectOptionType) => void;
  onMultiChange?: (selected: SelectOptionType[]) => void;
  value?: SelectOptionType;
  multi?: boolean;
  selected?: SelectOptionType[];
}

export interface SelectOptionType {
  value: string | number;
  text: string;
}

export const Select: React.FC<SelectProps> = (props) => {
  const {
    className,
    placeholder,
    options,
    onChange,
    onMultiChange,
    multi,
    selected = [],
    value,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState({ value: null, text: placeholder ?? 'Выберите опцию' });
  // const [selectedItems, setSelectedItems] = useState(selected);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeSelect = (e: any) => {
      if (e.target instanceof Node && isOpen && !ref.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', closeSelect);
    return () => {
      window.removeEventListener('click', closeSelect);
    };
  }, [isOpen]);

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: any) => {
    onChange?.(option);
  };

  const addTag = useCallback((item: SelectOptionType) => {
    onMultiChange?.([...selected, item]);
  }, [selected, onMultiChange]);

  const removeTag = useCallback((item: any) => {
    const filtered = selected.filter((e) => e !== item);
    onMultiChange?.(filtered);
  }, [selected, onMultiChange]);

  const onMultiChangeHandler = useCallback((item: any) => {
    const changedOption = options?.find((option) => option.value.toString() === item.id.toString());
    if (item.value && changedOption) {
      addTag(changedOption);
    } else {
      removeTag(changedOption);
    }
  }, [addTag, removeTag, options]);

  return (
    <div
      className={classNames(cls.select, {
        [cls.open]: isOpen,
      }, [className])}
      onClick={toggleSelect}
      ref={ref}
    >
      {multi ? (
        <div>
          {selected?.length === 0
            ? <span className={cls.selectedItem}>{placeholder}</span>
            : (
              <div className={cls.selectedList}>
                {selectedItems?.map((item) => (
                  <div
                    className={cls.selected}
                    key={item.value}
                  >
                    {item.text}
                    <Button
                      theme={ButtonThemes.CLEAR}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(item);
                      }}
                    ><CloseIcon />
                    </Button>
                  </div>
                ))}
                {/* указать при какой именно длине массива выводить этот спан */}
                {/* <span className={cls.more}>ещё</span> */}
              </div>
            )}
          <ul className={cls.optionsList}>
            {
              options?.map((option) => (
                <MultiselectItem
                  key={option.value}
                  id={option.value.toString()}
                  text={option.text}
                  onChange={onMultiChangeHandler}
                  checked={Boolean(selected.find((item) => item.value === option.value))}
                />
              ))
            }
          </ul>
        </div>
      ) : (
        <div>
          <span className={cls.selectedItem}>{value?.text ?? placeholder}</span>
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
