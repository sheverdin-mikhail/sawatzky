import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton, SkeletonThemes } from 'shared/ui/Skeleton/Skeleton';
import cls from './ApplicationDetailLoader.module.scss';

interface ApplicationDetailLoaderProps {
  className?: string;
}

export const ApplicationDetailLoader: React.FC<ApplicationDetailLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.applicationDetailLoader, {}, [className])}>
      <Skeleton className={cls.title} width="180px" height={30} mBottom={20} theme={SkeletonThemes.ROUND_S} />
      <Skeleton width="100%" height={130} mBottom={16} theme={SkeletonThemes.ROUND_L} />
      <Skeleton width="100%" height={120} mBottom={16} theme={SkeletonThemes.ROUND_L} />
      <Skeleton width="100%" height={120} mBottom={16} theme={SkeletonThemes.ROUND_L} />
      <Skeleton width="100%" height={120} theme={SkeletonThemes.ROUND_L} />
    </div>
  );
};
