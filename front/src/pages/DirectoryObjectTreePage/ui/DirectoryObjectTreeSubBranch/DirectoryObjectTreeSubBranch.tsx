import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import cls from './DirectoryObjectTreeSubBranch.module.scss';

interface DirectoryObjectTreeSubBranchProps {
  className?: string;
  number: string;
  name: string;
  counterparties: string[];
  employee: string[];
  isActive: boolean;
  setIsActiveSub: any;
}

export const DirectoryObjectTreeSubBranch: React.FC<DirectoryObjectTreeSubBranchProps> = (props) => {
  const {
    number, name, counterparties, employee, isActive, setIsActiveSub,
  } = props;

  const [isActiveSubTree, setIsActiveSubTree] = useState<boolean>(false);

  const onToggleActiveSub = useCallback(() => {
    setIsActiveSubTree((prev) => !prev);
  }, []);

  setIsActiveSub(isActiveSubTree);

  return (
    <div className={classNames(cls.info, { [cls.active]: isActive, [cls.collapse]: isActiveSubTree }, [])}>
      <div
        className={classNames(cls.object, { [cls.collapse]: isActiveSubTree }, [])}
        onClick={onToggleActiveSub}
      >
        <p className={cls.text}>{number}</p>
        <p className={cls.bold}>{name}</p>
      </div>
      <div className={classNames(cls.lists, { [cls.active]: isActiveSubTree }, [])}>
        <div className={cls.names}>
          <div className={cls.name}>Контрагенты</div>
          <ul className={classNames(cls.name, {}, [cls.list])}>
            {counterparties.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={cls.names}>
          <div className={classNames(cls.name, {}, [cls.blue])}>Сотрудники Sawatzky</div>
          <ul className={classNames(cls.name, {}, [cls.list, cls.blue])}>
            {employee.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i}>{item}</li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
};
