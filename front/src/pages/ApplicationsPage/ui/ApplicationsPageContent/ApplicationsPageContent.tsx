import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Title } from 'shared/ui/Title/Title';
import { Checkbox } from 'shared/ui/Checkbox/Checkbox';
import { ReactComponent as AddLogo } from 'shared/assets/icons/add-icon.svg';
import { ReactComponent as DeleteLogo } from 'shared/assets/icons/delete-icon.svg';
import { ReactComponent as OrderLogo } from 'shared/assets/icons/order-icon.svg';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { CreateApplicationModal } from 'features/CreateApplication';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useUserData } from 'shared/lib/hooks/useUserData/useUserData';
import { applicationsPageActions, applicationsPageReducer, getApplicationsPage } from '../../model/slice/applicationsPageSlice';
import cls from './ApplicationsPageContent.module.scss';
import { fetchApplicationsList } from '../../model/services/fetchApplicationsList/fetchApplicationsList';
import { ApplicationPreviewList } from '../ApplicationPreviewList/ApplicationPreviewList';
import {
  getAllIsChecked, getApplicationIsLoading, getCheckedItems, getModalIsOpen, getPageInit,
} from '../../model/selectors/applicationsPageSelectors';
import { deleteCheckedItems } from '../../model/services/deleteCheckedItems/deleteCheckedItems';
import { ApplicationLoader } from '../ApplicationLoader/ApplicationLoader';

interface ApplicationsPageContentProps {
}

const reducers: ReducersList = {
  applicationsPage: applicationsPageReducer,
};

export const ApplicationsPageContent: React.FC<ApplicationsPageContentProps> = (props) => {
  const dispatch = useAppDispatch();
  const applications = useSelector(getApplicationsPage.selectAll);
  const isLoading = useSelector(getApplicationIsLoading);
  const allIsChecked = useSelector(getAllIsChecked);
  const checkeditems = useSelector(getCheckedItems);
  const modalIsOpen = useSelector(getModalIsOpen);
  const init = useSelector(getPageInit);

  const { isSawatzky, employee, sawatzkyEmployee } = useUserData();

  const fetchingParams = useMemo(() => {
    if (isSawatzky) {
      return { params: { workObject: sawatzkyEmployee?.workingObjects } };
    }
    return { params: { legalEntity: employee?.legalEntity } };
  }, [isSawatzky, employee?.legalEntity, sawatzkyEmployee?.workingObjects]);

  const checkAllHandler = useCallback(() => {
    dispatch(applicationsPageActions.toggleAllCheckboxes());
  }, [dispatch]);

  const onDeleteHandler = useCallback(() => {
    if (checkeditems) {
      dispatch(deleteCheckedItems(checkeditems));
    }
  }, [checkeditems, dispatch]);

  const openModalHandler = useCallback(() => {
    dispatch(applicationsPageActions.oepnModal());
  }, [dispatch]);

  const closeModalHandler = useCallback(() => {
    dispatch(applicationsPageActions.closeModal());
  }, [dispatch]);

  useEffect(() => {
    if (init) {
      dispatch(fetchApplicationsList(fetchingParams));
    } else {
      dispatch(applicationsPageActions.initPage());
    }
  }, [dispatch, init, fetchingParams]);

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>

      <Title className={cls.title}>
        Запросы
      </Title>
      <div className={cls.navigation}>
        <Checkbox id="all" checked={allIsChecked} onChange={checkAllHandler} />
        <Button className={cls.iconBtn} theme={ButtonThemes.ICON}>
          <OrderLogo />
        </Button>
        {
          !isSawatzky && (
            <>
              <Button className={cls.iconBtn} theme={ButtonThemes.ICON} helpInfo="добавить запрос" onClick={openModalHandler}>
                <AddLogo />
              </Button>
              <Button className={cls.iconBtn} theme={ButtonThemes.ICON} helpInfo="удалить запрос" onClick={onDeleteHandler}>
                <DeleteLogo />
              </Button>
            </>
          )
        }
      </div>
      {
        isLoading
          ? <ApplicationLoader />
          : (
            <>
              <ApplicationPreviewList className={cls.list} applications={applications} />
              <CreateApplicationModal isOpen={modalIsOpen} onClose={closeModalHandler} />
            </>
          )

      }
    </DynamicModuleLoader>

  );
};
