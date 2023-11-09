import { classNames } from 'shared/lib/classNames/classNames';
import { ReactComponent as DefaultAvatarIcon } from 'shared/assets/icons/default-avatar-icon.svg';
import { CSSProperties } from 'react';
import cls from './Avatar.module.scss';

interface AvatarProps {
    className?: string;
    avatarUrl?: string;
    size?: string | number;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { className, avatarUrl, size = 25 } = props;

  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={classNames(cls.avatar, {}, [className])} style={style}>
      {
        avatarUrl
          ? <img src={avatarUrl} alt="avatar" className={cls.icon} />
          : <DefaultAvatarIcon className={cls.icon} />
      }
    </div>
  );
};
