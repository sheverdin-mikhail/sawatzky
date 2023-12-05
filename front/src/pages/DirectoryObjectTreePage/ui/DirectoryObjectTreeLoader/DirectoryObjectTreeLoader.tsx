import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton, SkeletonThemes } from 'shared/ui/Skeleton/Skeleton';
import cls from './DirectoryObjectTreeLoader.module.scss';

interface DirectoryObjectTreeLoaderProps {
  className?: string;
}

export const DirectoryObjectTreeLoader: React.FC<DirectoryObjectTreeLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.directoryObjectTreeLoader, {}, [className])}>
      <div className={cls.header}>
        <Skeleton width="380px" height={46} mBottom={16} theme={SkeletonThemes.ROUND_S} />
        <Skeleton width="520px" height={60} theme={SkeletonThemes.ROUND_S} />
      </div>
      <div className={cls.branches}>
        <div className={cls.branch}>
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
        </div>
        <div className={cls.branch}>
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
        </div>
        <div className={cls.branch}>
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
        </div>
        <div className={cls.branch}>
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
        </div>
        <div className={cls.branch}>
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
        </div>
        <div className={cls.branch}>
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
          <Skeleton width="150px" height={60} theme={SkeletonThemes.ROUND_S} />
        </div>
      </div>
    </div>
  );
};
