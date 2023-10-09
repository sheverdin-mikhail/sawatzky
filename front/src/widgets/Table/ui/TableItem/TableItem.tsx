import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableItem.module.scss';
import { TableItemType } from '../../model/type/table';

interface TableItemProps {
	className?: string;
	item: TableItemType;
	type?: ItemTheme;
}

export const enum ItemTheme {
	HEADER = 'header',
	BODY = 'body'
} 

export const TableItem: React.FC<TableItemProps> = (props) => {
	const { className, item, type=ItemTheme.BODY } = props;

	return (
		<div className={classNames(cls.tableItem, {}, [className, cls[type]])}>
			{
				Object.keys(item).map((key, index)=>(
					<div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / Object.keys(item).length}%` }} >
						<span className={cls.text}>{item[key]}</span>
					</div>
				))
			}
		</div>
	);
}