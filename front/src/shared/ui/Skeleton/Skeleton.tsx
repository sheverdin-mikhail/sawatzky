import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: number;
  theme?: SkeletonThemes;
  mLeft?: number;
  mTop?: number;
  mRight?: number;
  mBottom?: number;
}

export enum SkeletonThemes {
  ROUND_L = 'roundLittle',
  ROUND_S = 'roundSmall',
  ROUND_M = 'roundMedium',
  ROUND = 'round',
}

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    className, theme = SkeletonThemes.ROUND_L, width = '100px', height = 25, mLeft, mTop, mRight, mBottom,
  } = props;

  return (
    <div
      style={{
        width: `${width}`, height: `${height}px`, marginLeft: `${mLeft}px`, marginTop: `${mTop}px`, marginRight: `${mRight}px`, marginBottom: `${mBottom}px`,
      }}
      className={classNames(cls.skeleton, {}, [className, cls[theme]])}
    />
  );
};
