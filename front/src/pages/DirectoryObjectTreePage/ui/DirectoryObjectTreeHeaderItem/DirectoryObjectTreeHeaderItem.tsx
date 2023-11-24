import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import cls from './DirectoryObjectTreeHeaderItem.module.scss';

interface DirectoryObjectTreeHeaderItemProps {
  className?: string;
  children: ReactNode;
}

export const DirectoryObjectTreeHeaderItem: React.FC<DirectoryObjectTreeHeaderItemProps> = (props) => {
  const { className, children } = props;

  return (
    <div className={classNames(cls.directoryObjectTreeHeaderItem, {}, [className])}>
      {children}
    </div>
  );
};
