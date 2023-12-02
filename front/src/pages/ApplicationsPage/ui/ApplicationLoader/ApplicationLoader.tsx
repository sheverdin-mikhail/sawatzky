import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton, SkeletonThemes } from 'shared/ui/Skeleton/Skeleton';
import cls from './ApplicationLoader.module.scss';

interface ApplicationLoaderProps {
    className?: string;
}

export const ApplicationLoader: React.FC<ApplicationLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.applicationLoader, {}, [className])}>
      <div className={cls.item}>
        <div className={cls.row}>
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={250} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={131} theme={SkeletonThemes.ROUND_S} />
        </div>
        <Skeleton height={80} width={1000} theme={SkeletonThemes.ROUND_S} />
      </div>
      <div className={cls.item}>
        <div className={cls.row}>
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={250} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={131} theme={SkeletonThemes.ROUND_S} />
        </div>
        <Skeleton height={80} width={1000} theme={SkeletonThemes.ROUND_S} />
      </div>
      <div className={cls.item}>
        <div className={cls.row}>
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={250} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={131} theme={SkeletonThemes.ROUND_S} />
        </div>
        <Skeleton height={80} width={1000} theme={SkeletonThemes.ROUND_S} />
      </div>
      <div className={cls.item}>
        <div className={cls.row}>
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={250} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={131} theme={SkeletonThemes.ROUND_S} />
        </div>
        <Skeleton height={80} width={1000} theme={SkeletonThemes.ROUND_S} />
      </div>
      <div className={cls.item}>
        <div className={cls.row}>
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={16} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={250} theme={SkeletonThemes.ROUND_S} />
          <Skeleton height={16} width={131} theme={SkeletonThemes.ROUND_S} />
        </div>
        <Skeleton height={80} width={1000} theme={SkeletonThemes.ROUND_S} />
      </div>
    </div>
  );
};
