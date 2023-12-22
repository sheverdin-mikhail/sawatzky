import { classNames } from 'shared/lib/classNames/classNames';
import { Title } from 'shared/ui/Title/Title';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as OrderLogo } from 'shared/assets/icons/order-icon.svg';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteLogo } from 'shared/assets/icons/delete-icon.svg';
import { ReactComponent as DeleteFileLogo } from 'shared/assets/icons/del-file-icon.svg';
import { AddReportModal } from 'features/AddReport';
import { useCallback } from 'react';
import { Select, SelectThemes } from 'shared/ui/Select/Select';
import { DateInput } from 'shared/ui/DateInput/DateInput';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getAddReportIsOpen } from 'features/AddReport/model/selectors/addReportSelectors';
import { addReportActions } from 'features/AddReport/model/slice/addReportSlice';
import cls from './ReportsPageContent.module.scss';
import { ReportsList } from '../ReportsList/ReportsList';

interface ReportsPageContentProps {
  className?: string;
}

export const ReportsPageContent: React.FC<ReportsPageContentProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const reportFormIsOpen = useSelector(getAddReportIsOpen);

  const onReportModalOpenHandler = useCallback(() => {
    dispatch(addReportActions.openModal());
  }, [dispatch]);

  const onReportModalCloseHandler = useCallback(() => {
    dispatch(addReportActions.closeModal());
  }, [dispatch]);

  return (
    <div className={classNames(cls.reportsPageContent, {}, [className])}>
      <Title className={cls.title}>Отчеты</Title>
      <div className={cls.navigation}>
        <Button className={cls.btn} theme={ButtonThemes.ICON}> <OrderLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON} helpInfo="добавить отчёт" onClick={onReportModalOpenHandler}> <AddLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON} helpInfo="удалить отчёт"> <DeleteLogo /></Button>
        <Select className={cls.selectSearch} placeholder="Выбор проектов" theme={SelectThemes.ACTIVE} />
        <Select className={cls.selectSearch} placeholder="Заказчики" theme={SelectThemes.BORDER} />
        {/* <DateInput className={cls.date} /> */}
        <Button className={cls.btn} theme={ButtonThemes.ICON}> <DeleteFileLogo /></Button>
      </div>
      <ReportsList />
      <AddReportModal isOpen={reportFormIsOpen} onClose={onReportModalCloseHandler} />
    </div>
  );
};
