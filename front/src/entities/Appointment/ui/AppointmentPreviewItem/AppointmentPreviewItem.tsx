import { classNames } from 'shared/lib/classNames/classNames';
import cls from './AppointmentPreviewItem.module.scss';
import { Appointement } from '../../models/types/appointment';
import { AppointmentTag } from '../AppointmentTag/AppointmentTag';
import { memo } from 'react';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { useNavigate } from 'react-router-dom';

interface AppointmentPreviewItemProps {
    className?: string;
    item: Appointement;
}

export const AppointmentPreviewItem: React.FC<AppointmentPreviewItemProps> = memo((props) => {
    const { className, item  } = props;

    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate(`/appointment/${item.id}`)
    }

    return (
        <div className={classNames(cls.appointmentPreviewItem, {}, [className])}>
            <div className={classNames(cls.header)} >
                <Checkbox id={item.id} />
                <span className={cls.title} >
                    {item.title}
                </span>
                <span className={cls.number} >
                    Заявка № {item.id}
                </span>
            </div>
            <div className={classNames(cls.appointmentPreviewItemRow, {}, [])} onClick={onClickHandler}>
                <div className={classNames(cls.column, {}, [cls.firstColumn])}>
                    <span className={cls.subtitle}>Дата создания: {item.createdAt}</span>
                    <AppointmentTag className={cls.tag} status={item.status} />
                </div>
                <div className={classNames(cls.column, {}, [])}>
                    <span className={cls.subtitle}>Предмет запроса:</span>
                    <p className={cls.text} >Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее</p>
                </div>
                <div className={classNames(cls.verticalLine, {}, [cls.column])}></div>
                <div className={classNames(cls.column, {}, [])}>
                    <p>
                        Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. .....
                    </p>
                </div>
            </div>
        </div>
    );
})