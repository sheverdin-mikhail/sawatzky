import { classNames } from 'shared/lib/classNames/classNames';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableBody } from '../TableBody/TableBody';
import { TableItemType, TableItemsMod, TableType } from '../../model/type/table';

interface TableProps {
	className?: string;
	mod?: TableItemsMod;
	data: TableType;
	path?: string;
	selectedItems?: TableItemType[];
	onSelectItem?: (item: TableItemType) => void;
	onSelectAll?: () => void;
	selectedAll?: boolean;
	onDelete?: (item: TableItemType) => void;
}

export const Table: React.FC<TableProps> = (props) => {
  const {
    className,
    mod = TableItemsMod.NORMAL,
    data,
    path,
    onDelete,
    onSelectItem,
    selectedItems,
    selectedAll,
    onSelectAll,
  } = props;

  return (
    <div className={classNames('', {}, [className])}>
      <TableHeader options={data.header} mod={mod} selectedAll={selectedAll} onSelectAll={onSelectAll} />
      {
        data.items && (
          <TableBody
            path={path}
            items={data.items}
            mod={mod}
            onCheck={onSelectItem}
            selectedItems={selectedItems}
            onDelete={onDelete}
          />
        )
      }
    </div>
  );
};
