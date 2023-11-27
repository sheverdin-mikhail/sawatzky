import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { useEffect } from 'react';
import { fetchWorkObjectGroupList, getWorkObjectGroup, workObjectGroupReducer } from 'entities/WorkObjectGroup';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import cls from './DirectoryObjectTreePage.module.scss';
import { DirectoryObjectTreeHeader } from '../DirectoryObjectTreeHeader/DirectoryObjectTreeHeader';
import { DirectoryObjectTreeBranches } from '../DirectoryObjectTreeBranches/DirectoryObjectTreeBranches';

interface DirectoryObjectTreePageProps {
  className?: string;
}

const reducers: ReducersList = {
  workObjectGroup: workObjectGroupReducer,
};

const DirectoryObjectTreePage: React.FC<DirectoryObjectTreePageProps> = (props) => {
  const { className } = props;

  const workObjectGroupList = useSelector(getWorkObjectGroup.selectAll);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWorkObjectGroupList());
  }, [dispatch]);

  return (
    <DirectoryPageWrapper className={classNames(cls.directoryObjectTreePage, {}, [className])}>
      <DynamicModuleLoader reducers={reducers}>
        <DirectoryObjectTreeHeader />
        <DirectoryObjectTreeBranches />
      </DynamicModuleLoader>
    </DirectoryPageWrapper>
  );
};

export default DirectoryObjectTreePage;
