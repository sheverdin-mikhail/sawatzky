import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Alert.module.scss';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';

interface AlertProps {
    className?: string;
    isCollapsed?: boolean;
}

export const Alert: React.FC<AlertProps> = (props) => {
    const { isCollapsed } = props;

    return (
        <div className={classNames(cls.alert, { [cls.collapsed]: isCollapsed }, [])}>
            <p className={cls.count}>1 <span className={cls.text}>/ 5</span></p>
            <p className={cls.body}>Вас назначили исполнителем заявка № Маг3652</p>
            <Button theme={ButtonThemes.CLEAR_BLACK} className={cls.moreBtn}>Подробнее</Button>
            <div className={cls.btns}>
                <Button theme={ButtonThemes.BLUE_SOLID} className={cls.btn}>Принять</Button>
                <Button theme={ButtonThemes.BLUE_BORDER} className={cls.btn}>Отказаться</Button>
            </div>
        </div>
    );
};
