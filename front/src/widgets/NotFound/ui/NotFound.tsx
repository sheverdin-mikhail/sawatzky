import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFound.module.scss';

interface NotFoundProps {
  className?: string;
}

export const NotFound: React.FC<NotFoundProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.notFound, {}, [className])}>
      <p className={cls.number}>404</p>
      <p className={cls.text}>Ой... Мы не можем найти страницу!</p>
    </div>
  );
};
