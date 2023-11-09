import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './SidebarItem.module.scss';
import { SidebarItemType } from '../models/types/sidebar';

interface SidebarItemProps {
    className?: string;
    item: SidebarItemType;
    isCollapsed?: boolean;
    isActive?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const {
    className,
    item,
    isCollapsed,
    isActive,
  } = props;

  return (
    <AppLink
      className={classNames(cls.link, {
        [cls.collapsed]: isCollapsed,
        [cls.active]: isActive,
      }, [className])}
      to={item.path}
    >
      <div className={cls.iconContainer}>
        <item.Icon className={cls.icon} />
      </div>
      <span className={cls.text}>
        {item.text}
      </span>
    </AppLink>
  );
};
