import { TableItemType, TableItemsMod } from '../../model/type/table';
import { TableItemBody } from '../TableItemBody/TableItemBody';
import { TableItemHeader } from '../TableItemHeader/TableItemHeader';

interface TableItemProps {
	className?: string;
	item?: TableItemType;
	type?: ItemTheme;
	mod?: TableItemsMod;
	path?: string;
	isChecked?: boolean;
	selectedAll?: boolean;
	onSelectAll?: () => void;
	onCheck?: () => void;
	onDelete?: (item: TableItemType) => void;
}

export const enum ItemTheme {
	HEADER = 'header',
	BODY = 'body'
}

export const TableItem: React.FC<TableItemProps> = (props) => {
  const {
    className,
    item,
    type = ItemTheme.BODY,
    mod,
    path,
    isChecked,
    selectedAll,
    onSelectAll,
    onCheck,
    onDelete,
  } = props;

  return (
    type === ItemTheme.BODY
      ? (
        <TableItemBody
          className={className}
          item={item}
          mod={mod}
          path={path}
          isChecked={isChecked}
          onCheck={onCheck}
          onDelete={onDelete}
        />
      )
      : (
        <TableItemHeader
          className={className}
          item={item}
          mod={mod}
          selectedAll={selectedAll}
          onSelectAll={onSelectAll}
        />
      )
  );
};
