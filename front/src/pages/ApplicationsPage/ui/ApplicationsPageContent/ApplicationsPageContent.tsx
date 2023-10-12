import cls from './ApplicationsPageContent.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Title } from 'shared/ui/Title/Title';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteLogo } from 'shared/assets/icons/delete-icon.svg'
import { ReactComponent as OrderLogo } from 'shared/assets/icons/order-icon.svg'
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { CreateApplicationModal } from 'features/CreateApplication';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applicationsPageActions, applicationsPageReducer, getApplicationsPage } from '../../model/slice/applicationsPageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchApplicationsList } from '../../model/services/fetchApplicationsList/fetchApplicationsList';
import { ApplicationPreviewList } from '../ApplicationPreviewList/ApplicationPreviewList';
import { getAllIsChecked, getCheckedItems, getInitPage, getModalIsOpen } from '../../model/selectors/applicationsPageSelectors';
import { deleteCheckedItems } from '../../model/services/deleteCheckedItems/deleteCheckedItems';


interface ApplicationsPageContentProps {
}

const reducers: ReducersList = {
    applicationsPage: applicationsPageReducer
}

export const ApplicationsPageContent: React.FC<ApplicationsPageContentProps> = (props) => {
    const dispatch = useAppDispatch()
    const applications = useSelector(getApplicationsPage.selectAll)
    const allIsChecked = useSelector(getAllIsChecked)
    const checkeditems = useSelector(getCheckedItems)
    const modalIsOpen = useSelector(getModalIsOpen)
    const _init = useSelector(getInitPage)



    const checkAllHandler = useCallback(() => {
        dispatch(applicationsPageActions.toggleAllCheckboxes(allIsChecked ?? false))
    },[dispatch, allIsChecked])

    const onDeleteHandler = useCallback(()=>{
        if(checkeditems){
            dispatch(deleteCheckedItems(checkeditems))
        }
    }, [checkeditems, dispatch])

    const openModalHandler = useCallback(()=>{
        dispatch(applicationsPageActions.oepnModal())
    },[dispatch])

    const closeModalHandler = useCallback(()=>{
        dispatch(applicationsPageActions.closeModal())
    },[dispatch])


    useEffect(()=>{
        if(_init){
            dispatch(fetchApplicationsList())
        }else{
            dispatch(applicationsPageActions.initPage())
        }
        
    },[_init])

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Title className={cls.title}>
                Заявки
            </Title>
            <div className={cls.navigation}>
                <Checkbox id='all' checked={allIsChecked} onChange={checkAllHandler} />
                <Button className={cls.iconBtn} theme={ButtonThemes.ICON}>
                    <OrderLogo/>
                </Button>
                <Button className={cls.iconBtn} theme={ButtonThemes.ICON} helpInfo={'добавить заявку'} onClick={openModalHandler}>
                    <AddLogo/>
                </Button>
                <Button className={cls.iconBtn} theme={ButtonThemes.ICON} helpInfo={'удалить заявку'} onClick={onDeleteHandler}>
                    <DeleteLogo/>
                </Button>
            </div>
            <ApplicationPreviewList className={cls.list}  applications={applications} />
            <CreateApplicationModal isOpen={modalIsOpen} onClose={closeModalHandler} />
        </DynamicModuleLoader>

	);
}