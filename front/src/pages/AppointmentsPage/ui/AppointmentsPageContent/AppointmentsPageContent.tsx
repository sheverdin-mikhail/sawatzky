import cls from './AppointmentsPageContent.module.scss';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { AppointmentPreviewList, appointmentReducer, getAppointment } from 'entities/Appointment';
import { Title } from 'shared/ui/Title/Title';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteLogo } from 'shared/assets/icons/delete-icon.svg'
import { ReactComponent as OrderLogo } from 'shared/assets/icons/order-icon.svg'
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { CreateAppointmentModal } from 'features/CreateAppointment';
import { useState } from 'react';
import { useSelector } from 'react-redux';


interface AppointmentsPageContentProps {
}

const reducers: ReducersList = {
    appointment: appointmentReducer
}

export const AppointmentsPageContent: React.FC<AppointmentsPageContentProps> = (props) => {
	 const appointments = useSelector(getAppointment.selectAll)
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
            <AppointmentPreviewList className={cls.list}  appointments={appointments} />
            <CreateAppointmentModal isOpen={isOpen} onClose={()=>setIsOpen(false)} />
        </DynamicModuleLoader>

	);
}