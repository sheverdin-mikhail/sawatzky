import { classNames } from 'shared/lib/classNames/classNames';
import { Title } from 'shared/ui/Title/Title';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as OrderLogo } from 'shared/assets/icons/order-icon.svg';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteLogo } from 'shared/assets/icons/delete-icon.svg';
import { ReactComponent as DeleteFileLogo } from 'shared/assets/icons/del-file-icon.svg';
import cls from './ReportsPageContent.module.scss';
import { ReportsList } from '../ReportsList/ReportsList';

interface ReportsPageContentProps {
  className?: string;
}

export const ReportsPageContent: React.FC<ReportsPageContentProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.reportsPageContent, {}, [className])}>
      <Title className={cls.title}>Отчеты</Title>
      <div className={cls.navigation}>
        <Button className={cls.btn} theme={ButtonThemes.ICON}> <OrderLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON} helpInfo="добавить отчёт"> <AddLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON} helpInfo="удалить отчёт"> <DeleteLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON}> <DeleteFileLogo /></Button>
      </div>
      <ReportsList />
    </div>
  );
};
