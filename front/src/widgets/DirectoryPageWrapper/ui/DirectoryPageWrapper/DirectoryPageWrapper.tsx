import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { DirectoryNavigation, directoryNavigationReducer } from 'widgets/DirectoryNavigaion';
import { ReactNode } from 'react';
import { Title } from 'shared/ui/Title/Title';
import cls from './DirectoryPageWrapper.module.scss';

interface DirectoryPageWrapperProps {
    className?: string;
    children: ReactNode;
}

const reducers: ReducersList = {
  direcotryNavigation: directoryNavigationReducer,
};
export const DirectoryPageWrapper: React.FC<DirectoryPageWrapperProps> = (props) => {
  const { className, children } = props;

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.directoryPageWrapper, {}, [className])}>
        <Title className={cls.title}>Справочнки</Title>
        <DirectoryNavigation className={cls.links} />
        <div className={cls.content}>
          {
            children
          }
        </div>
      </div>
    </DynamicModuleLoader>
  );
};
