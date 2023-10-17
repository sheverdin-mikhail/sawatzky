import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableItemBody.module.scss';
import { TableItemType, TableItemsMod } from '../../model/type/table';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getTableSelectedItems } from '../../model/selectors/tableSelectors';
import { MouseEvent, useCallback, useMemo } from 'react';
import { tableActions } from '../../model/slice/tableSlice';


interface TableItemBodyProps {
	className?: string;
	item?: TableItemType;
	mod?: TableItemsMod;
	path?: string;
}

export const TableItemBody: React.FC<TableItemBodyProps> = (props) => {
	const { className, item, mod, path } = props;

	const dispatch = useAppDispatch()
	const selectedItems = useSelector(getTableSelectedItems)

	const onCheckClick = useCallback((e: MouseEvent)=>{
		e.stopPropagation()
		e.preventDefault()
		if(item){
			dispatch(tableActions.toggleSelectItem(item))
		}
	},[dispatch, item])

	const isChecked = useMemo(()=>{

			return selectedItems?.includes(item!!)
		
	},[selectedItems, item])


	const itemBody = useMemo(()=>{
		switch(mod){
			case TableItemsMod.LINK:
				return (
					<AppLink to={`${path}${item?.id}`} className={classNames(cls.tableItemBody, {}, [className, cls[mod]])}>
						{
							<Checkbox 
								className={cls.checkbox} 
								id={`${item?.id}`} 
								onClick={onCheckClick} 
								checked={isChecked}
							/>
						}
						{
							item && Object.keys(item).map((key, index)=>(
								<div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / Object.keys(item).length}%` }} >
									<span className={cls.text}>{item[key]}</span>
								</div>
							))
						}
					</AppLink>
				)
			case TableItemsMod.NORMAL:
				return (
					<div className={classNames(cls.tableItemBody, {}, [className])}>
						{
							<Checkbox 
								className={cls.checkbox} 
								id={`${item?.id}`} 
								onClick={onCheckClick} 
								checked={isChecked}
							/>
						}
						{
							item && Object.keys(item).map((key, index)=>(
								<div className={cls.column} key={`${key}_table_item_column`} style={{ flex: `1 0 ${100 / Object.keys(item).length}%` }} >
									<span className={cls.text}>{item[key]}</span>
								</div>
							))
						}
					</div>
				)
			default: 
				return null
			
		}

	},[mod, isChecked, path, className, item, onCheckClick])


	return itemBody
}