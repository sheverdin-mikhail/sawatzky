import { useCallback, useMemo, useState } from 'react';
import {
  Table, TableItemType, TableItemsMod, TableType,
} from 'widgets/Table';

export interface UseTableProps {
  className?: string;
	mod?: TableItemsMod;
	data: TableType;
	path?: string;
	onDelete?: (item: TableItemType) => void;
}

type UseTableResult = {
    Table: any;
    onDelete: (item: TableItemType) => void;
    onCheck: (item: TableItemType) => void;
    onSelectAll: () => void;
    selectedItems: TableItemType[];
}

export const useTable = (props: UseTableProps): UseTableResult => {
  const {
    data,
    onDelete,
    path,
    mod,
    className,
  } = props;

  const [selectedItems, setSelectedItems] = useState<TableItemType[]>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);

  const onDeleteHandler = useCallback((item: TableItemType) => {
    onDelete?.(item);
  }, [onDelete]);

  const onCheckHandler = useCallback((item: TableItemType) => {
    if (selectedItems.find((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems((prev) => prev.filter((selectedItem) => item.id !== selectedItem.id));
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  }, [selectedItems]);

  const onSelectAllHandler = useCallback(() => {
    if (selectedAll) {
      setSelectedAll(false);
      setSelectedItems([]);
    } else {
      setSelectedAll(true);
      setSelectedItems(data.items!!);
    }
  }, [selectedAll, data]);

  const TableComponent = useMemo(() => (
    <Table
      path={path}
      mod={mod}
      className={className}
      data={data}
      onDelete={onDeleteHandler}
      onSelectAll={onSelectAllHandler}
      onSelectItem={onCheckHandler}
      selectedAll={selectedAll}
      selectedItems={selectedItems}
    />
  ), [data, onDeleteHandler, onSelectAllHandler, onCheckHandler, selectedAll, selectedItems, path, mod, className]);

  return {
    Table: TableComponent,
    onDelete: onDeleteHandler,
    onCheck: onCheckHandler,
    onSelectAll: onSelectAllHandler,
    selectedItems,
  };
};
