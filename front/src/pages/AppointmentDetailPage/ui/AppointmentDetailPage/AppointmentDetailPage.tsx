import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { AppointmentDetailContent } from '../AppointmentDetailContent/AppointmentDetailContent';

interface AppointmentDetailPageProps {
    className?: string;
}

const AppointmentDetailPage: React.FC<AppointmentDetailPageProps> = (props) => {
    const { className } = props;
    const { id } = useParams()

    return (
        <div className={classNames(cls.appointmentDetailPage, {}, [className])}>
            <AppointmentDetailContent appointmentId={id || ''} />
        </div>
    );
}

export default AppointmentDetailPage