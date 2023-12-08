import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
  className?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.notFound, {}, [className])}>
      <p className={cls.number}>404</p>
      <p className={cls.text}>Ой... Мы не можем найти страницу!</p>
    </div>
  );
};

export default NotFoundPage;
