import { classNames } from 'shared/lib/classNames/classNames';
import { ReportsPageContent } from '../ReportsPageContent/ReportsPageContent';

interface ReportsPageProps {
  className?: string;
}

export const ReportsPage: React.FC<ReportsPageProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames('', {}, [className ?? ''])}>
      <ReportsPageContent />
    </div>
  );
};
