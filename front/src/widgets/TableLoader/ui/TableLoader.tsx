import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton, SkeletonThemes } from 'shared/ui/Skeleton/Skeleton';
import cls from './TableLoader.module.scss';

interface TableLoaderProps {
  className?: string;
}

export const TableLoader: React.FC<TableLoaderProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.tableLoader, {}, [className])}>
      <Skeleton width="100%" height={48} theme={SkeletonThemes.ROUND_S} />
      <Skeleton width="100%" height={48} theme={SkeletonThemes.ROUND_S} />
    </div>
  );
};
