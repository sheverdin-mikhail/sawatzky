import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryWorkMaterialGroupDetailPage.module.scss';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg'
import { TableItemsMod, TableType } from 'widgets/Table';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams } from 'react-router-dom';
import { fetchWorkMaterialListByGroupId } from '../../model/services/fetchWorkMaterialListByGroupId';
import { 
    directoryWorkMaterialGroupDetailReducer, 
    getDirectoryWorkMaterialGroupDetail 
} from '../../model/slice/directoryWorkMaterialGroupDetailSlice';
import { AddWorkMaterialModal, addWorkMaterialFormActions, addWorkMaterialFormReducer, getAddWorkMaterialFormIsOpen } from 'features/AddWorkMaterial';
import { getWorkMaterialGroupName } from '../../model/selectors/directoryWorkMaterialGroupDetailSelectors';
import { useTable } from 'shared/lib/hooks/useTable';

interface DirectoryObjectsGroupPageProps {
	className?: string;
}


const reducers: ReducersList = {
    directoryWorkMaterialGroupDetail: directoryWorkMaterialGroupDetailReducer,
    addWorkMaterialForm: addWorkMaterialFormReducer,

}

const DirectoryWorkMaterialGroupDetailPage: React.FC<DirectoryObjectsGroupPageProps> = (props) => {
    const { className } = props;

    const dispatch = useAppDispatch()
    const { id } = useParams()

    const workMaterialList = useSelector(getDirectoryWorkMaterialGroupDetail.selectAll)
    const groupName = useSelector(getWorkMaterialGroupName)
    const isOpen = useSelector(getAddWorkMaterialFormIsOpen)

    useEffect(()=>{
        dispatch(fetchWorkMaterialListByGroupId(id!!))
    },[dispatch, id])

    const openFormHandler = useCallback(()=>{
        dispatch(addWorkMaterialFormActions.openModal())
    },[dispatch])


    const tableData: TableType = {
        header: {
            id: 'ID',
            groupName: 'Группа услуг',
            name: 'Название услуги',
            price: 'Стоимость/час',
            count: 'Рекомендуемое количество материала',
        },
        items: workMaterialList.map((item)=>({
            id: item.id,
            groupName: groupName ?? '',
            name: item.name,
            price: item.price + ' ₽',
            count: item.count
        }))
    }


    const { Table } = useTable({
        data: tableData,
        mod: TableItemsMod.LINK,
    })


    return (
        <DynamicModuleLoader reducers={reducers}>
            <DirectoryPageWrapper className={classNames(cls.directoryWorkMaterialGroupDetailPage, {}, [className])}>
                <div className={cls.buttons}>
                    <Button helpInfo='Добавить услугу' onClick={openFormHandler} className={cls.button} theme={ButtonThemes.ICON}  >
                        <AddIcon />
                    </Button>
                    <Button helpInfo='Удалить услугу' className={cls.button} theme={ButtonThemes.ICON}  >
                        <DeleteIcon />
                    </Button>
                </div>
                { Table }
                <AddWorkMaterialModal className={cls.form} isOpen={isOpen} groupId={Number(id)} />
            </DirectoryPageWrapper>
        </DynamicModuleLoader>
    );
}


export default DirectoryWorkMaterialGroupDetailPage;