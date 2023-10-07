import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentsPage.module.scss';
import { Title } from 'shared/ui/Title/Title';
import { AppointmentPreviewList, getAppointments } from 'entities/Appointment';
import { useSelector } from 'react-redux';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg'
import { ReactComponent as DeleteLogo } from 'shared/assets/icons/delete-icon.svg'
import { ReactComponent as OrderLogo } from 'shared/assets/icons/order-icon.svg'
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { CreateAppointmentModal } from 'features/CreateAppointment';

interface AppointmentsPageProps {
    className?: string;
}

const AppointmentsPage: React.FC<AppointmentsPageProps> = (props) => {
    const { className } = props;
    const appointments = useSelector(getAppointments)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={classNames(cls.appointmentsPage, {}, [className ?? ''])}>
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
        </div>
    );
}

export default AppointmentsPage;