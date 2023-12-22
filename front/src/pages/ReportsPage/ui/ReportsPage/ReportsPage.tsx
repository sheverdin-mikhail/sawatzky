import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchWorkObjectGroupList, workObjectGroupReducer } from 'entities/WorkObjectGroup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useEffect } from 'react';
import { addReportReducer } from 'features/AddReport/model/slice/addReportSlice';
import { ReportsPageContent } from '../ReportsPageContent/ReportsPageContent';

interface ReportsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  workObjectGroup: workObjectGroupReducer,
  addReportForm: addReportReducer,
};

export const ReportsPage: React.FC<ReportsPageProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkObjectGroupList());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames('', {}, [className ?? ''])}>
        <ReportsPageContent />
      </div>
    </DynamicModuleLoader>
  );
};
