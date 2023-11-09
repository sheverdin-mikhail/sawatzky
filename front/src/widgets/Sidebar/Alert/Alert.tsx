import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Alert.module.scss';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { AlertType } from '../models/types/sidebar';

interface AlertProps {
    className?: string;
    isCollapsed: boolean;
    alerts: AlertType[];
}

export const Alert: React.FC<AlertProps> = (props) => {
    const { isCollapsed, alerts } = props;

    return (
        <div className={classNames(cls.alert, { [cls.collapsed]: isCollapsed }, [])}>
            <p className={cls.count}>{alerts[0].id} <span className={cls.text}>/ {alerts.length}</span></p>
            <p className={cls.body}>Вас назначили исполнителем заявка № {alerts[0].name}</p>
            <Button theme={ButtonThemes.CLEAR_BLACK} className={cls.moreBtn}>Подробнее</Button>
            <div className={cls.btns}>
                <Button theme={ButtonThemes.BLUE_SOLID} className={cls.btn}>Принять</Button>
                <Button theme={ButtonThemes.BLUE_BORDER} className={cls.btn}>Отказаться</Button>
            </div>
        </div>
    );
};
