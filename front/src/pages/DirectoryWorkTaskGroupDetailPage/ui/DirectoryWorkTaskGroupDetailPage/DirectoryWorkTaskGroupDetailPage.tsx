import { classNames } from 'shared/lib/classNames/classNames';
import { DirectoryPageWrapper } from 'widgets/DirectoryPageWrapper';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { ReactComponent as AddIcon } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteIcon } from 'shared/assets/icons/delete-icon.svg';
import { TableItemsMod, TableType } from 'widgets/Table';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams } from 'react-router-dom';
import {
  AddWorkTaskModal, addWorkTaskFormActions, addWorkTaskFormReducer, getAddWorkTaskFormIsOpen,
} from 'features/AddWorkTask';
import { getTime } from 'shared/lib/helpers/getTime';
import { useTable } from 'shared/lib/hooks/useTable';
import { getWorkTaskGroupName } from '../../model/selectors/directoryWorkTaskGroupDetailSelectors';
import {
  directoryWorkTaskGroupDetailReducer,
  getDirectoryWorkTaskGroupDetail,
} from '../../model/slice/directoryWorkTaskGroupDetailSlice';
import { fetchWorkTaskListByGroupId } from '../../model/services/fetchWorkTaskListByGroupId';
import cls from './DirectoryWorkTaskGroupDetailPage.module.scss';

interface DirectoryObjectsGroupPageProps {
	className?: string;
}

const reducers: ReducersList = {
  directoryWorkTaskGroupDetail: directoryWorkTaskGroupDetailReducer,
  addWorkTaskForm: addWorkTaskFormReducer,

};

const DirectoryWorkTaskGroupDetailPage: React.FC<DirectoryObjectsGroupPageProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const workTaskList = useSelector(getDirectoryWorkTaskGroupDetail.selectAll);
  const groupName = useSelector(getWorkTaskGroupName);
  const isOpen = useSelector(getAddWorkTaskFormIsOpen);

  useEffect(() => {
    dispatch(fetchWorkTaskListByGroupId(id!!));
  }, [dispatch, id]);

  const openFormHandler = useCallback(() => {
    dispatch(addWorkTaskFormActions.openModal());
  }, [dispatch]);

  const tableData: TableType = {
    header: {
      id: 'ID',
      groupName: 'Группа услуг',
      name: 'Название услуги',
      price: 'Стоимость/час',
      time: 'Рекомендуемое время',
    },
    items: workTaskList.map((item) => ({
      id: item.id,
      groupName: groupName ?? '',
      name: item.name,
      price: `${item.price} ₽`,
      time: `${getTime(item.time).hours} ч ${getTime(item.time).minuts} мин`,
    })),
  };

  const { Table } = useTable({
    data: tableData,
    mod: TableItemsMod.LINK,
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <DirectoryPageWrapper className={classNames(cls.directoryWorkTaskGroupDetailPage, {}, [className])}>
        <div className={cls.buttons}>
          <Button helpInfo="Добавить услугу" onClick={openFormHandler} className={cls.button} theme={ButtonThemes.ICON}>
            <AddIcon />
          </Button>
          <Button helpInfo="Удалить услугу" className={cls.button} theme={ButtonThemes.ICON}>
            <DeleteIcon />
          </Button>
        </div>
        {Table}
        <AddWorkTaskModal className={cls.form} isOpen={isOpen} groupId={Number(id)} />
      </DirectoryPageWrapper>
    </DynamicModuleLoader>
  );
};

export default DirectoryWorkTaskGroupDetailPage;
