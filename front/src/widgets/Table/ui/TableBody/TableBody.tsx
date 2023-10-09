import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableBody.module.scss';
import { TableItemType } from '../../model/type/table';
import { ItemTheme, TableItem } from '../TableItem/TableItem';

interface TableBodyProps {
	className?: string;
	items: TableItemType[];
}

export const TableBody: React.FC<TableBodyProps> = (props) => {
	const { className, items } = props;

	return (
		<div className={classNames(cls.tableBody, {}, [className])}>
			{
				items.map((item, index)=><TableItem key={`${index}`} type={ItemTheme.BODY} item={item} />)
			}
		</div>
	);
}