import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableHeader.module.scss';
import { TableHeaderType, TableItemsMod } from '../../model/type/table';
import { ItemTheme, TableItem } from '../TableItem/TableItem';

interface TableHeaderProps {
	className?: string;
	options: TableHeaderType;
	mod?: TableItemsMod;
}

export const TableHeader: React.FC<TableHeaderProps> = (props) => {
	const { className, options, mod } = props;

	return (
		<div className={classNames(cls.tableHeader, {}, [className])}>
			<TableItem item={options} type={ItemTheme.HEADER} mod={mod} />
		</div>
	);
}