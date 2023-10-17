import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableBody.module.scss';
import { TableItemType, TableItemsMod } from '../../model/type/table';
import { ItemTheme, TableItem } from '../TableItem/TableItem';

interface TableBodyProps {
	className?: string;
	items?: TableItemType[];
	mod?: TableItemsMod;
	path?: string;
}

export const TableBody: React.FC<TableBodyProps> = (props) => {
	const { className, items, mod, path } = props;

	return (
		<div className={classNames(cls.tableBody, {}, [className])}>
			{
				items?.map((item, index)=><TableItem path={path} mod={mod} key={`${index}`} type={ItemTheme.BODY} item={item} />)
			}
		</div>
	);
}