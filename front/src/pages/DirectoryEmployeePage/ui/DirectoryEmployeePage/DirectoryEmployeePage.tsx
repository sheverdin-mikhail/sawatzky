import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { Table, TableType } from 'widgets/Table';
import { useCallback, useState } from 'react';
import { CreateLegalEntityModal } from 'features/CreateLegalEntity';
import cls from './DirectoryEmployeePage.module.scss';

interface DirectoryEmployeePageProps {
	className?: string;
}

const DirectoryEmployeePage: React.FC<DirectoryEmployeePageProps> = (props) => {
  const { className } = props;
  const [legalEntityFormIsOpen, setLegalEntityFormIsOpen] = useState(false);

  const onLegalEntityFormCloseHandler = useCallback(() => {
    setLegalEntityFormIsOpen(false);
  }, []);

  const tableData: TableType = {
    header: {
      id: 'ID',
      name: 'ФИО',
      company: 'Компания  ',
      phone: 'Моб. Телефон',
      role: 'Роль',
    },
    items: [
    ],
  };

  return (
    <DirectoryPageWrapper className={classNames(cls.directoryEmployeePage, {}, [className])}>
      <div className={cls.buttons}>
        <Button helpInfo="Добавить представителя заказчика" onClick={() => setLegalEntityFormIsOpen(true)} className={cls.button} theme={ButtonThemes.ICON}>
          <AddIcon />
        </Button>
        <Button helpInfo="Удалить представителя заказчика" className={cls.button} theme={ButtonThemes.ICON}>
          <DeleteIcon />
        </Button>
      </div>
      <Table data={tableData} />
      <CreateLegalEntityModal
        onClose={onLegalEntityFormCloseHandler}
        isOpen={legalEntityFormIsOpen}
        className={cls.form}
      />

    </DirectoryPageWrapper>
  );
};

export default DirectoryEmployeePage;
