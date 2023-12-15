import { classNames } from 'shared/lib/classNames/classNames';
import { Title } from 'shared/ui/Title/Title';
import cls from './ReportsPageContent.module.scss';

interface ReportsPageContentProps {
  className?: string;
}

export const ReportsPageContent: React.FC<ReportsPageContentProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.reportsPageContent, {}, [className])}>
      <Title>Отчеты</Title>
    </div>
  );
};
