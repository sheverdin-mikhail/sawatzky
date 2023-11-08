import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Alerts.module.scss';
import { ReactComponent as AlertIcon } from 'shared/assets/icons/alert-icon.svg';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-icon-right.svg';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';

interface AlertsProps {
    className?: string;
}

export const Alerts: React.FC<AlertsProps> = (props) => {
    const { className } = props;

    return (
        <div className={classNames(cls.alert, {}, [cls.collapsed, className ?? ''])}>
            <AlertIcon className={cls.icon} />
            <Button theme={ButtonThemes.WHITE_ROUND} className={cls.alertBtn}><ArrowIcon className={cls.arrow} /></Button>
        </div>
    );
};
