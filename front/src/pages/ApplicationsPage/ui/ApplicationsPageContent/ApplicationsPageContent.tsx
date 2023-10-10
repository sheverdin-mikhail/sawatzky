import cls from './ApplicationsPageContent.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ApplicationPreviewList, applicationReducer, getApplication } from 'entities/Application';
import { Title } from 'shared/ui/Title/Title';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteLogo } from 'shared/assets/icons/delete-icon.svg'
import { ReactComponent as OrderLogo } from 'shared/assets/icons/order-icon.svg'
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { CreateApplicationModal } from 'features/CreateApplication';
import { useState } from 'react';
import { useSelector } from 'react-redux';


interface ApplicationsPageContentProps {
}

const reducers: ReducersList = {
    application: applicationReducer
}

export const ApplicationsPageContent: React.FC<ApplicationsPageContentProps> = (props) => {
	 const applications = useSelector(getApplication.selectAll)
	 const [isOpen, setIsOpen] = useState(false)

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Title className={cls.title}>
                Заявки
            </Title>
            <div className={cls.navigation}>
                <Checkbox id='all' />
                <Button className={cls.iconBtn} theme={ButtonThemes.ICON}>
                    <OrderLogo/>
                </Button>
                <Button className={cls.iconBtn} theme={ButtonThemes.ICON} helpInfo={'добавить заявку'} onClick={()=>setIsOpen(true)}>
                    <AddLogo/>
                </Button>
                <Button className={cls.iconBtn} theme={ButtonThemes.ICON} helpInfo={'удалить заявку'}>
                    <DeleteLogo/>
                </Button>
            </div>
            <ApplicationPreviewList className={cls.list}  applications={applications} />
            <CreateApplicationModal isOpen={isOpen} onClose={()=>setIsOpen(false)} />
        </DynamicModuleLoader>

	);
}