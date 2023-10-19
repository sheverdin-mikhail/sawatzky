import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableBody.module.scss';
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
	const { className, items, mod, path, onCheck, onDelete, selectedItems } = props;



	return (
		<div className={classNames(cls.tableBody, {}, [className])}>
			{
				items?.map((item, index)=><TableItem  
					path={path} 
					mod={mod} 
					key={`${index}`} 
					type={ItemTheme.BODY} 
					item={item} 
					onCheck={() => onCheck?.(item)}
					onDelete={() => onDelete?.(item)}
					isChecked={selectedItems?.includes(item)}
				/>)
			}
		</div>
	);
}