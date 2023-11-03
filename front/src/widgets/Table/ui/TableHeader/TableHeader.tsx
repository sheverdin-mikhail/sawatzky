import { classNames } from 'shared/lib/classNames/classNames';
import { TableHeaderType, TableItemsMod } from '../../model/type/table';
import { ItemTheme, TableItem } from '../TableItem/TableItem';

interface TableHeaderProps {
	className?: string;
	options?: TableHeaderType;
	mod?: TableItemsMod;
	onSelectAll?: () => void;
	selectedAll?: boolean;
}

export const TableHeader: React.FC<TableHeaderProps> = (props) => {
	const { className, options, mod, onSelectAll, selectedAll } = props;


	return (
		<div className={classNames('', {}, [className])}>
			<TableItem 
				item={options} 
				type={ItemTheme.HEADER} 
				mod={mod} 
				onSelectAll={onSelectAll} 
				selectedAll={selectedAll} 
			/>
		</div>
	);
}