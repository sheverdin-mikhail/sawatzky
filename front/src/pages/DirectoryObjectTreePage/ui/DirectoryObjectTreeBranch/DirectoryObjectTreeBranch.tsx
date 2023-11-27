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
  const [subObjects, setSubObjects] = useState<any[]>(object.map((item) => ({ ...item, isActiveSub: false })));

  const onToggleActive = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onToggleSubBranch = useCallback((value: any) => {
    const newObjects = subObjects.map((item) => (item.number === value.number ? { ...item, isActiveSub: value.isActiveSub } : item));
    setSubObjects(newObjects);
    setIsActiveSub(Boolean(newObjects.find((item) => item.isActiveSub)));
  }, [subObjects]);

  return (
    <div className={classNames(cls.directoryObjectTreeBranch, { [cls.active]: isActiveSub }, [])}>
      <div className={classNames(cls.chief, { [cls.active]: isActive }, [])} onClick={onToggleActive}>
        <p className={cls.text}>{department}</p>
        <p className={cls.text}>{position} <span className={cls.bold}>{name}</span></p>
      </div>
      {subObjects.map((item: any) => (
        <DirectoryObjectTreeSubBranch
          key={item.number}
          number={item.number}
          name={item.name}
          counterparties={item.counterparties}
          employee={item.employee}
          isActive={isActive}
          isActiveSub={item.isActiveSub}
          onToggle={onToggleSubBranch}
        />
      ))}
    </div>
  );
};
