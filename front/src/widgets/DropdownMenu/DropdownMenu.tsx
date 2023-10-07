import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DropdownMenu.module.scss';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { useCallback, useState } from 'react';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { AppLInkTheme, AppLink } from 'shared/ui/AppLink/AppLink';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

interface DropdownMenuProps {
    className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
    const { className } = props;
    const user = useSelector(getUserAuthData)
    const [ isCollapsed, setIsCollapsed ] = useState(false)
    const dispatch = useAppDispatch()

    const onClickHandler = useCallback(() => {
        setIsCollapsed(prev => !prev)
    },[])

    const onLogoutHandler = useCallback(()=>{
        dispatch(userActions.logout())
    }, [dispatch])

    return (
        <div 
            className={classNames(cls.dropdownMenu, {
                [cls.active]: isCollapsed
            }, [className])}
            onClick={onClickHandler}
        >
            <div className={cls.preview}>
                <Avatar size={25}/>
                <span className={cls.text}>{user?.fio}</span>
            </div>
            <div className={cls.menu} >
                <div className={cls.column} style={{minHeight: 0}}> 
                    <AppLink to={'/'} theme={AppLInkTheme.BLUE} className={cls.button}>
                        Сменить пароль
                    </AppLink>
                    <Button className={cls.button} onClick={onLogoutHandler} theme={ButtonThemes.CLEAR}>Выйти</Button>
                </div>
            </div>
        </div>
    );
}