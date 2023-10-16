import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableBody } from '../TableBody/TableBody';
import { TableItemsMod, TableType } from '../../model/type/table';

interface TableProps {
	className?: string;
	data: TableType;
	mod?: TableItemsMod;
	path?: string;
}


export const Table: React.FC<TableProps> = (props) => {
	const { className, data, mod=TableItemsMod.NORMAL, path } = props;

	return (
		<div className={classNames(cls.table, {}, [className])}>
			<TableHeader options={data.header} mod={mod} />
			{
				data.items && <TableBody path={path} items={data.items} mod={mod}  />
			}
		</div>
	);
}