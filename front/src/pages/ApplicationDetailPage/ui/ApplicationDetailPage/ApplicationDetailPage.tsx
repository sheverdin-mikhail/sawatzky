import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { ApplicationDetailContent } from '../ApplicationDetailContent/ApplicationDetailContent';

interface ApplicationDetailPageProps {
    className?: string;
}

const ApplicationDetailPage: React.FC<ApplicationDetailPageProps> = (props) => {
    const { className } = props;
    const { id } = useParams()

    return (
        <div className={classNames('', {}, [className])}>
            <ApplicationDetailContent applicationId={id || ''} />
        </div>
    );
}

export default ApplicationDetailPage