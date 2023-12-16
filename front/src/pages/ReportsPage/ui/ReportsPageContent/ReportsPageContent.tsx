import { classNames } from 'shared/lib/classNames/classNames';
import { Title } from 'shared/ui/Title/Title';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as OrderLogo } from 'shared/assets/icons/order-icon.svg';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteLogo } from 'shared/assets/icons/delete-icon.svg';
import { ReactComponent as DeleteFileLogo } from 'shared/assets/icons/del-file-icon.svg';
import { AddReportModal } from 'features/AddReport';
import { useCallback, useState } from 'react';
import cls from './ReportsPageContent.module.scss';
import { ReportsList } from '../ReportsList/ReportsList';

interface ReportsPageContentProps {
  className?: string;
}

export const ReportsPageContent: React.FC<ReportsPageContentProps> = (props) => {
  const { className } = props;

  const [isOpen, setIsOpen] = useState(false);

  const onReportModalCloseHandler = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className={classNames(cls.reportsPageContent, {}, [className])}>
      <Title className={cls.title}>Отчеты</Title>
      <div className={cls.navigation}>
        <Button className={cls.btn} theme={ButtonThemes.ICON}> <OrderLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON} helpInfo="добавить отчёт" onClick={() => setIsOpen(true)}> <AddLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON} helpInfo="удалить отчёт"> <DeleteLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON}> <DeleteFileLogo /></Button>
      </div>
      <ReportsList />
      <AddReportModal isOpen={isOpen} onClose={onReportModalCloseHandler} />
    </div>
  );
};
