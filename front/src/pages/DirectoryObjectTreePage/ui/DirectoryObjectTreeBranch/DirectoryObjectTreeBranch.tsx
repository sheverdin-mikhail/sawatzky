import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryObjectTreeBranch.module.scss';

interface DirectoryObjectTreeBranchProps {
  className?: string;
}

export const DirectoryObjectTreeBranch: React.FC<DirectoryObjectTreeBranchProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.directoryObjectTreeBranch, {}, [cls.active, className])}>
      <div className={cls.chief}>
        <p className={cls.text}>Первый отдел</p>
        <p className={cls.text}>и.о. РОУ <span className={cls.bold}>Петров П.П.</span></p>
      </div>
      <div className={cls.info}>
        <div className={cls.object}>
          <p className={cls.text}>Объект № 1</p>
          <p className={cls.bold}>Название название</p>
        </div>
        <div className={cls.lists}>
          <div className={cls.names}>
            <div className={cls.name}>Контрагенты</div>
            <ul className={classNames(cls.name, {}, [cls.list])}>
              <li>Название 1</li>
              <li>Название 2</li>
              <li>Название 3</li>
              <li>Название 4</li>
              <li>Название 5</li>
              <li>Название 6</li>
              <li>Название 7</li>
              <li>Название 8</li>
              <li>Название 9</li>
              <li>Название 10</li>
              <li>Название 11</li>
            </ul>
          </div>
          <div className={cls.names}>
            <div className={classNames(cls.name, {}, [cls.blue])}>Сотрудники Sawatzky</div>
            <ul className={classNames(cls.name, {}, [cls.list, cls.blue])}>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
              <li>Иванов К.А.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
