import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryWorkTaskGroupPage.module.scss';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg'
import { Table, TableItemsMod, TableType } from 'widgets/Table';
import { DirectoryPath } from 'shared/config/RouteConfig/appRouteConfig';
import { 
	AddWorkTaskGroupModal, 
	addWorkTaskGroupFormActions, 
	addWorkTaskGroupFormReducer, 
	getAddWorkTaskGroupFormIsOpen 
} from 'features/AddWorkTaskGroup';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getWorkTaskGroup, workTaskGroupReducer } from 'entities/WorkTaskGroup';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchWorkTaskGroupList } from 'entities/WorkTaskGroup/model/services/fetchWorkTaskGroupList';

interface DirectoryObjectsGroupPageProps {
	className?: string;
}


const reducers: ReducersList = {
	workTaskGroup: workTaskGroupReducer,
	addWorkTaskGroupForm: addWorkTaskGroupFormReducer
}

const DirectoryWorkTaskGroupPage: React.FC<DirectoryObjectsGroupPageProps> = (props) => {
	const { className } = props;

	const dispatch = useAppDispatch()
	const workObjectsList = useSelector(getWorkTaskGroup.selectAll)
	const isOpen = useSelector(getAddWorkTaskGroupFormIsOpen)

	useEffect(()=>{
		dispatch(fetchWorkTaskGroupList())
	},[dispatch])

	const openFormHandler = useCallback(()=>{
		dispatch(addWorkTaskGroupFormActions.openModal())
	},[dispatch])


	const tableData: TableType = {
		header: {
			id: 'ID',
			name: 'Наименование группы',
		},
		items: workObjectsList.map((item)=>({
			id: item.id,
			name: item.name
		}))
	}

	return (
		<DynamicModuleLoader reducers={reducers}>
			<DirectoryPageWrapper className={classNames(cls.directoryWorkTaskGroupPage, {}, [className])}>
				<div className={cls.buttons}>
					<Button helpInfo='Добавить группу услуг' onClick={openFormHandler} className={cls.button} theme={ButtonThemes.ICON}  >
						<AddIcon />
					</Button>
					<Button helpInfo='Удалить группу услуг' className={cls.button} theme={ButtonThemes.ICON}  >
						<DeleteIcon />
					</Button>
				</div>
				<Table mod={TableItemsMod.LINK} path={DirectoryPath.work_task_group_detail} data={tableData} />
				<AddWorkTaskGroupModal className={cls.form} isOpen={isOpen} />
			</DirectoryPageWrapper>
		</DynamicModuleLoader>
	);
}


export default DirectoryWorkTaskGroupPage;