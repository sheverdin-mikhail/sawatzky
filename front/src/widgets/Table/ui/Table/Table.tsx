import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableBody } from '../TableBody/TableBody';
import { TableType } from '../../model/type/table';

interface TableProps {
	className?: string;
	data: TableType;
}

export const Table: React.FC<TableProps> = (props) => {
	const { className, data } = props;

	return (
		<div className={classNames(cls.table, {}, [className])}>
			<TableHeader options={data.header} />
			{
				data.items && <TableBody items={data.items}  />
			}
		</div>
	);
}