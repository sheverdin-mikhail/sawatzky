import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableItemHeader.module.scss';
import { TableItemType } from '../../model/type/table';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getTableSelectedAll } from '../../model/selectors/tableSelectors';
import { MouseEvent, useCallback } from 'react';
import { tableActions } from '../../model/slice/tableSlice';

interface TableItemHeaderProps {
	className?: string;
	item?: TableItemType;
}


export const TableItemHeader: React.FC<TableItemHeaderProps> = (props) => {
	const { className, item } = props;

	const dispatch = useAppDispatch()
	const selectedAll = useSelector(getTableSelectedAll)

	const onCheckClick = useCallback((e: MouseEvent)=>{
		e.stopPropagation()
		e.preventDefault()
		if(item){
			dispatch(tableActions.toggleSelectAllItems())
		}
	},[dispatch, item])



	

	return (
		<div className={classNames(cls.tableItemHeader, {}, [className])}>
			{
				<Checkbox className={cls.checkbox} id={`${item?.id}`} onClick={onCheckClick} checked={selectedAll} />
			}
			{
				item && Object.keys(item).map((key, index)=>(
					<div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / Object.keys(item).length}%` }} >
						<span className={cls.text}>{item[key]}</span>
					</div>
				))
			}
		</div>
	);
}