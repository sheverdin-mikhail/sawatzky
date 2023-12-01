import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width?: number;
  height?: number;
  theme?: SkeletonThemes;
}

export enum SkeletonThemes {
  ROUND_L = 'roundLittle',
  ROUND_S = 'roundSmall',
  ROUND_M = 'roundMedium',
  ROUND = 'round',
}

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    className, theme = SkeletonThemes.ROUND_L, width = 100, height = 25,
  } = props;

  return (
    <div style={{ width: `${width}px`, height: `${height}px` }} className={classNames(cls.skeleton, {}, [className, cls[theme]])} />
  );
};
