import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableItemHeader.module.scss';
import { TableItemType } from '../../model/type/table';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { MouseEvent, useCallback } from 'react';

interface TableItemHeaderProps {
	className?: string;
	item?: TableItemType;
	selectedAll?: boolean;
	onSelectAll?: () => void;
}


export const TableItemHeader: React.FC<TableItemHeaderProps> = (props) => {
	const { className, item, selectedAll, onSelectAll } = props;


	const onCheckClick = useCallback((e: MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()
		onSelectAll?.()
	}, [onSelectAll])



	return (
		<div className={classNames(cls.tableItemHeader, {}, [className])}>
			{
				<Checkbox className={cls.checkbox} id={`${item?.id}`} onClick={(e) => onCheckClick(e)} checked={selectedAll} />
			}
			{
				item && Object.keys(item).map((key, index) => (
					<div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / (Object.keys(item).length + 1)}%` }} >
						<span className={cls.text}>{item[key]}</span>
					</div>
				))
			}
			<div className={cls.column} style={{ flex: `1 0 ${100 / Object.keys(item!!).length}%` }} >
			</div>
		</div>
	);
}
