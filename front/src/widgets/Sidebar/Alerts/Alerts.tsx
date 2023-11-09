import { classNames } from 'shared/lib/classNames/classNames';
import { useState, useCallback } from 'react';
import cls from './Alerts.module.scss';
import { ReactComponent as ArrowIcon } from 'shared/assets/icons/arrow-icon-right.svg';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Alert } from '../Alert/Alert';
import { AlertType } from '../models/types/sidebar';
import { AlertIcon } from '../AlertIcon/AlertIcon';

interface AlertsProps {
    className?: string;
}

export const Alerts: React.FC<AlertsProps> = (props) => {
    const { className } = props;

    const alertList: AlertType[] = [
        {
            id: '1',
            name: 'Маг3652',
        }
    ];

    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const onToggleCollapsed = useCallback(() => {
        setIsCollapsed(prev => !prev)
    }, []);

    return (
        <div className={classNames(cls.alert, { [cls.collapsed]: isCollapsed }, [])}>
            <AlertIcon
                isCollapsed={isCollapsed}
                length={alertList.length} />
            <Button
                theme={ButtonThemes.WHITE_ROUND}
                className={classNames(cls.alertBtn, { [cls.active]: !isCollapsed }, [])}
                onClick={onToggleCollapsed}>
                <ArrowIcon className={classNames(cls.arrow, { [cls.active]: !isCollapsed }, [])} />
            </Button>
            <Alert isCollapsed={isCollapsed} alerts={alertList} />
        </div>
    );
};
