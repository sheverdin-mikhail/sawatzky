import { classNames } from 'shared/lib/classNames/classNames';
import { ReactComponent as ForbiddenIcon } from 'shared/assets/icons/forbidden-icon.svg';
import cls from './ForbiddenPage.module.scss';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage: React.FC<ForbiddenPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.forbidden, {}, [className])}>
      <div className={cls.form}>
        <ForbiddenIcon />
        <p className={cls.text}>Недостаточно прав доступа!</p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
