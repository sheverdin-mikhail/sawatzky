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
    className, placeholder, options, onChange, multi,
  } = props;

  const selected: any[] = [
  ];

  const selectedItemsOptions: SelectOptionType[] = selected.map((item) => ({
    value: item.id,
    text: item.name,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: null, text: placeholder ?? 'Выберите опцию' });
  const [selectedItems, setSelectedItems] = useState(selectedItemsOptions);

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
    setSelectedOption(option);
    onChange?.(option);
  };

  const addTag = useCallback((item: any) => {
    setSelectedItems(selectedItems.concat(item));
  }, [selectedItems]);

  const removeTag = useCallback((item: any) => {
    const filtered = selectedItems.filter((e) => e !== item);
    setSelectedItems(filtered);
  }, [selectedItems]);
  const onMultiChange = useCallback((item: any) => {
    const changedOption = options?.find((option) => option.value === item.id);
    if (item.value) {
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
          {selectedItems?.length === 0
            ? <span className={cls.selectedItem}>{selectedOption.text}</span>
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
                  onChange={onMultiChange}
                  checked={Boolean(selectedItems.find((item) => item.value === option.value))}
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
