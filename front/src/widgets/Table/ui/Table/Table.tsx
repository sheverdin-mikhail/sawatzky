import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableBody } from '../TableBody/TableBody';
import { TableItemType, TableItemsMod, TableType } from '../../model/type/table';
import { useCallback, useState } from 'react';

interface TableProps {
	className?: string;
	mod?: TableItemsMod;
	data: TableType;
	path?: string;
	onDelete?: (item: TableItemType) => void;
}


export const Table: React.FC<TableProps> = (props) => {
	const { className, mod=TableItemsMod.NORMAL, data, path, onDelete } = props;



	const [selectedItems, setSelectedItems] = useState<TableItemType[]>([])
	const [selectedAll, setSelectedAll] = useState<boolean>(false)

	const onCheckHandler = useCallback((item: TableItemType)=>{
		if(selectedItems.includes(item)){
			setSelectedItems(prev => prev.filter(selectedItem => item.id !== selectedItem.id ) )
		}else{
			setSelectedItems(prev => [...prev, item])
		}

	},[selectedItems])



	const onSelectAllHandler = useCallback(() => {
		if(selectedAll){
			setSelectedAll(false)
			setSelectedItems([])
		}else{
			setSelectedAll(true)
			setSelectedItems(data.items!!)
		}
	},[selectedAll, data])


	return (
		<div className={classNames(cls.table, {}, [className])}>
			<TableHeader options={data.header} mod={mod} selectedAll={selectedAll} onSelectAll={onSelectAllHandler} />
			{
				data.items && <TableBody 
					path={path} 
					items={data.items} 
					mod={mod} 
					onCheck={onCheckHandler} 
					selectedItems={selectedItems} 
					onDelete={onDelete}
				/>
			}
		</div>
	);
}