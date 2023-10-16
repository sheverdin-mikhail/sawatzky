import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryWorkTaskGroupDetailPage.module.scss';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg'
import { Table, TableItemsMod, TableType } from 'widgets/Table';
import { DirectoryPath } from 'shared/config/RouteConfig/appRouteConfig';
import { 
	addWorkTaskGroupFormActions, 
	addWorkTaskGroupFormReducer, 
	getAddWorkTaskGroupFormIsOpen 
} from 'features/AddWorkTaskGroup';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams } from 'react-router-dom';
import { fetchWorkTaskListByGroupId } from '../../model/services/fetchWorkTaskListByGroupId';
import { 
	directoryWorkTaskGroupDetailReducer, 
	getDirectoryWorkTaskGroupDetail 
} from '../../model/slice/directoryWorkTaskGroupDetailSlice';
import { AddWorkTaskModal } from 'features/AddWorkTask';
import { getWorkTaskGroupName } from '../../model/selectors/directoryWorkTaskGroupDetailSelectors';

interface DirectoryObjectsGroupPageProps {
	className?: string;
}


const reducers: ReducersList = {
	directoryWorkTaskGroupDetail: directoryWorkTaskGroupDetailReducer,
	addWorkTaskGroupForm: addWorkTaskGroupFormReducer,

}

const DirectoryWorkTaskGroupDetailPage: React.FC<DirectoryObjectsGroupPageProps> = (props) => {
	const { className } = props;

	const dispatch = useAppDispatch()
	const { id } = useParams()

	const workTaskList = useSelector(getDirectoryWorkTaskGroupDetail.selectAll)
	const groupName = useSelector(getWorkTaskGroupName)
	const isOpen = useSelector(getAddWorkTaskGroupFormIsOpen)

	useEffect(()=>{
		dispatch(fetchWorkTaskListByGroupId(id!!))
	},[dispatch, id])

	const openFormHandler = useCallback(()=>{
		dispatch(addWorkTaskGroupFormActions.openModal())
	},[dispatch])


	const tableData: TableType = {
		header: {
			id: 'ID',
			groupName: 'Группа услуг',
			name: 'Название услуги',
			price: 'Стоимость/час',
		},
		items: workTaskList.map((item)=>({
			id: item.id,
			groupName: groupName ?? '',
			name: item.name,
			price: item.price
		}))
	}

	return (
		<DynamicModuleLoader reducers={reducers}>
			<DirectoryPageWrapper className={classNames(cls.directoryWorkTaskGroupDetailPage, {}, [className])}>
				<div className={cls.buttons}>
					<Button helpInfo='Добавить услугу' onClick={openFormHandler} className={cls.button} theme={ButtonThemes.ICON}  >
						<AddIcon />
					</Button>
					<Button helpInfo='Удалить услугу' className={cls.button} theme={ButtonThemes.ICON}  >
						<DeleteIcon />
					</Button>
				</div>
				<Table mod={TableItemsMod.LINK} path={DirectoryPath.work_task_group_detail} data={tableData} />
				<AddWorkTaskModal className={cls.form} isOpen={isOpen} />
			</DirectoryPageWrapper>
		</DynamicModuleLoader>
	);
}


export default DirectoryWorkTaskGroupDetailPage;