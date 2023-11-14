import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DirectoryObjectTreeBranches.module.scss';
import { DirectoryObjectTreeBranch } from '../DirectoryObjectTreeBranch/DirectoryObjectTreeBranch';

interface DirectoryObjectTreeBranchesProps {
  className?: string;
}

export const DirectoryObjectTreeBranches: React.FC<DirectoryObjectTreeBranchesProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames(cls.directoryObjectTreeBranches, {}, [className])}>
      <DirectoryObjectTreeBranch />
    </div>
  );
};
