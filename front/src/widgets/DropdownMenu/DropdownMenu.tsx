import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DropdownMenu.module.scss';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Avatar } from 'shared/ui/Avatar/Avatar';

interface DropdownMenuProps {
    className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
    const { className } = props;
    const user = useSelector(getUserAuthData)

    return (
        <div className={classNames(cls.dropdownMenu, {}, [className])}>
            <div className={cls.preview}>
                <Avatar size={25} />
                <span className={cls.text}>{user?.fio}</span>
            </div>
        </div>
    );
}