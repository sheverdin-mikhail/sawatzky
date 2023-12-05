import { classNames } from 'shared/lib/classNames/classNames';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage: React.FC<ForbiddenPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames('', {}, [className])}>
      Недостаточно прав для доступа к этой странице
    </div>
  );
};

export default ForbiddenPage;
