import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ApplicationDetailPage.module.scss';
import { useParams } from 'react-router-dom';
import { ApplicationDetailContent } from '../ApplicationDetailContent/ApplicationDetailContent';

interface ApplicationDetailPageProps {
    className?: string;
}

const ApplicationDetailPage: React.FC<ApplicationDetailPageProps> = (props) => {
    const { className } = props;
    const { id } = useParams()

    return (
        <div className={classNames(cls.applicationDetailPage, {}, [className])}>
            <ApplicationDetailContent applicationId={id || ''} />
        </div>
    );
}

export default ApplicationDetailPage