import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteFileLogo } from 'shared/assets/icons/del-file-icon.svg';
import { ReactComponent as SearchLogo } from 'shared/assets/icons/search-icon.svg';
import { TableType } from 'widgets/Table';
import { useMemo } from 'react';
import { useTable } from 'shared/lib/hooks/useTable';
import cls from './ReportsList.module.scss';

interface ReportsListProps {
  className?: string;
}

export const ReportsList: React.FC<ReportsListProps> = (props) => {
  const { className } = props;

  const tableData: TableType = useMemo(() => ({
    header: {
      id: 'ID',
      groupName: 'Дата отчета',
      name: 'ФИО создание отчета',
    },
  }), []);

  const { Table } = useTable({
    data: tableData,
  });

  return (
    <div className={classNames(cls.reportsList, {}, [className])}>
      <div className={cls.controls}>
        <Button className={cls.btn} theme={ButtonThemes.ICON} helpInfo="добавить отчёт"><AddLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON}><DeleteFileLogo /></Button>
        <Button className={cls.btn} theme={ButtonThemes.ICON} helpInfo="найти отчёт"><SearchLogo /></Button>
      </div>
      {Table}
    </div>
  );
};
