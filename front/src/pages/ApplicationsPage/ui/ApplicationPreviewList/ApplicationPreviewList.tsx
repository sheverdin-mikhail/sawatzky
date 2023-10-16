import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ApplicationPreviewList.module.scss';
import { Application } from 'entities/Application';
import { ApplicationPreviewItem } from '../ApplicationPreviewItem/ApplicationPreviewItem';

interface ApplicationPreviewListProps {
    className?: string;
    applications?: Application[];
}

export const ApplicationPreviewList: React.FC<ApplicationPreviewListProps> = (props) => {
    const { className, applications } = props;

    return (
        <div className={classNames(cls.applicationPreviewList, {}, [className])}>
            {
                applications && applications.length > 0
                ?
                    applications.map((application) => (
                        <ApplicationPreviewItem item={application} key={application.id} className={cls.item} /> 
                    ))
                :
                    <div>Запросы не найдены</div>
            }
        </div>
    );
}