import { classNames } from 'shared/lib/classNames/classNames';
import { TableItemType, TableItemsMod } from '../../model/type/table';
import { ItemTheme, TableItem } from '../TableItem/TableItem';

interface TableBodyProps {
	className?: string;
	items?: TableItemType[];
	mod?: TableItemsMod;
	path?: string;
	onCheck?: (item: TableItemType) => void;
	onDelete?: (item: TableItemType) => void;
	selectedItems?: TableItemType[];
}

export const TableBody: React.FC<TableBodyProps> = (props) => {
  const {
    className, items, mod, path, onCheck, onDelete, selectedItems,
  } = props;

  return (
    <div className={classNames('', {}, [className])}>
      {
        items?.map((item, index) => (
          <TableItem
            path={path}
            mod={mod}
            key={`TableBodyItem_${item.id}`}
            type={ItemTheme.BODY}
            item={item}
            onCheck={() => onCheck?.(item)}
            onDelete={() => onDelete?.(item)}
            isChecked={Boolean(selectedItems?.find((selectedItem) => item.id === selectedItem.id))}
          />
        ))
      }
    </div>
  );
};
