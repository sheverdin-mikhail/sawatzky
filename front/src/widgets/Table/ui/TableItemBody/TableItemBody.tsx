import { classNames } from 'shared/lib/classNames/classNames';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { MouseEvent, useCallback, useMemo } from 'react';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as CrossIcon } from 'shared/assets/icons/cross-icon.svg';
import { ReactComponent as PenIcon } from 'shared/assets/icons/pen-icon.svg';
import { TableItemType, TableItemsMod } from '../../model/type/table';
import cls from './TableItemBody.module.scss';

interface TableItemBodyProps {
	className?: string;
	item?: TableItemType;
	mod?: TableItemsMod;
	path?: string;
	isChecked?: boolean;
	onCheck?: (id: string) => void
	onDelete?: (item: TableItemType) => void
}

export const TableItemBody: React.FC<TableItemBodyProps> = (props) => {
  const {
    className, item, mod, path, isChecked, onCheck, onDelete,
  } = props;

  const onCheckHandler = useCallback((e: MouseEvent, id: any) => {
    e.stopPropagation();
    e.preventDefault();
    onCheck?.(id);
  }, [onCheck]);

  const onDeleteHandler = useCallback((e: MouseEvent, item: TableItemType) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete?.(item);
  }, [onDelete]);

  const itemBody = useMemo(() => {
    if (item) {
      switch (mod) {
      case TableItemsMod.LINK:
        return (
          <AppLink to={`${path}${item?.id}`} className={classNames(cls.tableItemBody, {}, [className, cls[mod]])}>
            <Checkbox
              className={cls.checkbox}
              id={`${item?.id}`}
              onClick={(e) => onCheckHandler(e, item?.id)}
              checked={isChecked}
            />
            {
              item && Object.keys(item).map((key, index) => (
                <div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / (Object.keys(item).length + 1)}%` }}>
                  <span className={cls.text}>{item[key]}</span>
                </div>
              ))
            }
            <div className={classNames(cls.column, {}, [cls.columnButtons])} style={{ flex: `1 0 ${100 / (Object.keys(item!!).length + 1)}%` }}>
              <div className={cls.buttons}>
                <Button
                  className={cls.button}
                  theme={ButtonThemes.CLEAR}
                  onClick={(e) => onDeleteHandler(e, item)}
                >
                  <CrossIcon />
                </Button>
                <Button className={cls.button} theme={ButtonThemes.CLEAR}><PenIcon /></Button>
              </div>
            </div>
          </AppLink>
        );
      case TableItemsMod.NORMAL:
        return (
          <div className={classNames(cls.tableItemBody, {}, [cls[mod], className])}>
            <Checkbox
              className={cls.checkbox}
              id={`${item?.id}`}
              onClick={(e) => onCheckHandler(e, item?.id)}
              checked={isChecked}
            />
            {
              item && Object.keys(item).map((key, index) => (
                <div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / (Object.keys(item).length + 1)}%` }}>
                  <span className={cls.text}>{item[key]}</span>
                </div>
              ))
            }
            <div className={classNames(cls.column, {}, [cls.columnButtons])} style={{ flex: `1 0 ${100 / (Object.keys(item!!).length + 1)}%` }}>
              <div className={cls.buttons}>
                <Button
                  className={cls.button}
                  theme={ButtonThemes.CLEAR}
                  onClick={(e) => onDeleteHandler(e, item)}
                >
                  <CrossIcon />
                </Button>
                <Button className={cls.button} theme={ButtonThemes.CLEAR}><PenIcon /></Button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
      }
    }
    return null;
  }, [mod, isChecked, path, className, item, onCheckHandler, onDeleteHandler]);

  return itemBody;
};
