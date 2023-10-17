import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableBody } from '../TableBody/TableBody';
import { TableItemsMod, TableType } from '../../model/type/table';
import { useSelector } from 'react-redux';
import { getTableHeader, getTableInit, getTableItems } from '../../model/selectors/tableSelectors';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { tableActions, tableReducer } from '../../model/slice/tableSlice';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface TableProps {
	className?: string;
	mod?: TableItemsMod;
	data: TableType;
	path?: string;
}

const reducers: ReducersList = {
	table: tableReducer,
}

export const Table: React.FC<TableProps> = (props) => {
	const { className, mod=TableItemsMod.NORMAL, data, path } = props;


	const dispatch = useAppDispatch()
	const header = useSelector(getTableHeader)
	const items = useSelector(getTableItems)
	const init = useSelector(getTableInit)
	
	useEffect(()=>{
		dispatch(tableActions.initTable(data))
	},[dispatch, data])

	return (
		<DynamicModuleLoader reducers={reducers}>
			<div className={classNames(cls.table, {}, [className])}>
				<TableHeader options={header} mod={mod} />
				{
					items && <TableBody path={path} items={items} mod={mod}  />
				}
			</div>
		</DynamicModuleLoader>
	);
}