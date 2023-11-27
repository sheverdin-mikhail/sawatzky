import { classNames } from 'shared/lib/classNames/classNames';
import { objectTreeType } from 'pages/DirectoryObjectTreePage/model/type/directoryObjectTree';
import { useCallback, useState } from 'react';
import cls from './DirectoryObjectTreeBranch.module.scss';
import { DirectoryObjectTreeSubBranch } from '../DirectoryObjectTreeSubBranch/DirectoryObjectTreeSubBranch';

interface DirectoryObjectTreeBranchProps {
  className?: string;
  department: string;
  name: string;
  position: string;
  object: objectTreeType[];
}

export const DirectoryObjectTreeBranch: React.FC<DirectoryObjectTreeBranchProps> = (props) => {
  const {
    department, name, position, object,
  } = props;

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveSub, setIsActiveSub] = useState<boolean>(false);

  const onToggleActive = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.directoryObjectTreeBranch, { [cls.active]: isActiveSub }, [])}>
      <div className={classNames(cls.chief, { [cls.active]: isActive }, [])} onClick={onToggleActive}>
        <p className={cls.text}>{department}</p>
        <p className={cls.text}>{position} <span className={cls.bold}>{name}</span></p>
      </div>
      {object.map((item) => (
        <DirectoryObjectTreeSubBranch
          key={item.number}
          number={item.number}
          name={item.name}
          counterparties={item.counterparties}
          employee={item.employee}
          isActive={isActive}
          setIsActiveSub={setIsActiveSub}
        />
      ))}
    </div>
  );
};
