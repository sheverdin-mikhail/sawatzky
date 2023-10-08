import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navigation.module.scss';
import { useState } from 'react';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarItemsList } from '../models/types/sidebar';
import { useLocation } from 'react-router-dom';

interface NavigationProps {
    className?: string;
}


export const Navigation: React.FC<NavigationProps> = (props) => {
    const { className } = props;
    const { pathname } = useLocation()

    const [ isCollapsed, setIsCollapsed ] = useState<boolean>(true)
    return (
        <div className={classNames(cls.navigation, {
            [cls.collapsed]: isCollapsed
        }, [className ?? ''])}
        onMouseEnter={()=>setIsCollapsed(false)}
        onMouseLeave={()=>setIsCollapsed(true)}
        
        >
            {
                SidebarItemsList.map(item => (
                    <SidebarItem 
                        item={item} 
                        key={item.path} 
                        isCollapsed={isCollapsed} 
                        isActive={pathname.split('/').slice(0, 2).join('/') === item.path}
                    />
                ))
            }
        </div>
    );
}