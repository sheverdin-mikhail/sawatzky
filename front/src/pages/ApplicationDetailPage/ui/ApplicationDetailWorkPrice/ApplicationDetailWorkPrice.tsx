import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { TableType } from 'widgets/Table';
import { getTime } from 'shared/lib/helpers/getTime';
import { CollapsBoard } from 'widgets/CollapsBoard';
import { ApplicationWorkMaterial, ApplicationWorkTask } from 'entities/Application';
import { useTable } from 'shared/lib/hooks/useTable';
import {
  AddWorkTaskApplicationModal,
  addWorkTaskApplicationFormActions,
  addWorkTaskApplicationFormReducer,
  getAddWorkTaskApplicationFormIsOpen,
} from 'features/AddWorkTaskToApplication';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { fetchWorkTaskGroupList, getWorkTaskGroup, workTaskGroupReducer } from 'entities/WorkTaskGroup';
import { useEffect, useMemo } from 'react';
import { DocList } from 'widgets/DocList';
import { docList } from 'widgets/DocList/model/type/docList';
import {
  AddWorkMaterialApplicationModal,
  addWorkMaterialApplicationFormActions,
  addWorkMaterialApplicationFormReducer,
  getAddWorkMaterialApplicationFormIsOpen,
} from 'features/AddWorkMaterialToApplication';
import { fetchWorkMaterialGroupList, getWorkMaterialGroup, workMaterialGroupReducer } from 'entities/WorkMaterialGroup';
import cls from './ApplicationDetailWorkPrice.module.scss';

interface ApplicationDetailWorkPriceProps {
	className?: string;
	applicationId: string;
	workTasks?: ApplicationWorkTask[];
	workMaterials?: ApplicationWorkMaterial[];
}

const reducers: ReducersList = {
  addWorkTaskApplicationForm: addWorkTaskApplicationFormReducer,
  addWorkMaterialApplicationForm: addWorkMaterialApplicationFormReducer,
  workTaskGroup: workTaskGroupReducer,
  workMaterialGroup: workMaterialGroupReducer,
};

export const ApplicationDetailWorkPrice: React.FC<ApplicationDetailWorkPriceProps> = (props) => {
  const { workTasks = [], workMaterials = [], applicationId } = props;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWorkTaskGroupList());
    dispatch(fetchWorkMaterialGroupList());
  }, [dispatch]);

  const addWorkTaskApplicationModalIsOpen = useSelector(getAddWorkTaskApplicationFormIsOpen);
  const addWorkMaterialApplicationModalIsOpen = useSelector(getAddWorkMaterialApplicationFormIsOpen);
  const workTaskGroups = useSelector(getWorkTaskGroup.selectAll);
  const workMaterialGroups = useSelector(getWorkMaterialGroup.selectAll);

  const docList: docList[] = [
    {
      id: '1', title: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.docx', date: '12.05.23', time: '15:00',
    },
    {
      id: '2', title: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.docx', date: '12.05.23', time: '15:00',
    },
    {
      id: '3', title: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.docx', date: '12.05.23', time: '15:00',
    },
  ];

  const payList: docList[] = [
    { id: '1', title: 'Платежный документ.docx' },
  ];

  const workTasksTable: TableType = {
    header: {
      id: 'ID',
      name: 'Наименование работ',
      price: 'Цена',
      time: 'Время',
      sum: 'Сумма',
    },
    items: workTasks.map((item) => {
      const { hours, minuts } = getTime(item.actualTime);
      const sum = item.workTask.price * hours + Math.floor(item.workTask.price * minuts / 60);
      const timeString = minuts > 0 && hours > 0
        ? `${hours} ч ${minuts} м`
        : minuts > 0
          ? `${minuts} м`
          : `${hours} ч`;

      return {
        id: item.workTask.id,
        name: item.workTask.name,
        price: `${item.workTask.price} ₽/час`,
        time: timeString,
        sum: `${sum} руб`,
      };
    }),

  };
  const workMaterialsTable: TableType = {
    header: {
      id: 'ID',
      name: 'Наименование материалов',
      price: 'Цена',
      count: 'Количество штук',
      sum: 'Сумма',
    },
    items: workMaterials.map((item) => {
      const sum = item.actualCount * item.workMaterial.price;

      return {
        id: item.workMaterial.id,
        name: item.workMaterial.name,
        price: `${item.workMaterial.price} ₽/шт`,
        count: `${item.actualCount}  шт`,
        sum: `${sum} руб`,
      };
    }),
  };

  const totalPrice = useMemo(() => {
    const workTotalPrice = workTasks.reduce((prev, item) => {
      const { hours, minuts } = getTime(item.actualTime);
      const sum = item.workTask.price * hours + Math.floor(item.workTask.price * minuts / 60);
      return prev + sum;
    }, 0);

    const materialTotalPrice = workMaterials.reduce((prev, item) => {
      const sum = item.actualCount * item.workMaterial.price;
      return prev + sum;
    }, 0);

    const clearPrice = workTotalPrice + materialTotalPrice;
    const taxPrice = (workTotalPrice + materialTotalPrice) * 0.2 + workTotalPrice + materialTotalPrice;
    return {
      clear: clearPrice,
      tax: taxPrice,
    };
  }, [workMaterials, workTasks]);

  const { Table: WorkTasksTable } = useTable({
    data: workTasksTable,
    className: cls.table,
    // onDelete: onTableDeleteHandler
  });

  const { Table: WorkMaterialsTable } = useTable({
    data: workMaterialsTable,
    className: cls.table,
    // onDelete: onTableDeleteHandler
  });

  return (
    <DynamicModuleLoader reducers={reducers}>
      <CollapsBoard title="Стоимость работ">
        <Button
          theme={ButtonThemes.CLEAR_BLUE}
          className={cls.controlBtn}
          onClick={() => dispatch(addWorkTaskApplicationFormActions.openModal())}
        >
          + Добавить работы
        </Button>
        <Button
          theme={ButtonThemes.CLEAR_BLUE}
          className={cls.controlBtn}
          onClick={() => dispatch(addWorkMaterialApplicationFormActions.openModal())}
        >+ Добавить расходный материал
        </Button>
        {/* <Button theme={ButtonThemes.CLEAR_BLUE} className={cls.controlBtn}>+ Загрузить документ </Button> */}
        <div className={cls.tablesBlock}>
          {WorkTasksTable}
          {WorkMaterialsTable}
          <p className={cls.price}>
            Общая стоимость работ/услуг и материалов составляет
            {'  '}
            <b className={cls.totalPrice}>
              {totalPrice.clear} ₽
            </b>
            {' '}
            без  НДС
          </p>
          <p className={cls.price}>
            Общая стоимость работ/услуг и материалов составляет
            {'  '}
            <b className={cls.totalPrice}>
              {totalPrice.tax} ₽
            </b>
            {' '}
            сумма с НДС
          </p>
        </div>

        {/* <DocList docs={docList} title="Список документов" /> */}
        {/* <DocList docs={payList} title="Платежный документ" /> */}
      </CollapsBoard>

      <AddWorkTaskApplicationModal
        isOpen={addWorkTaskApplicationModalIsOpen}
        workTaskGroups={workTaskGroups}
        applicationId={applicationId}
        prevWorkTasks={workTasks}
      />
      <AddWorkMaterialApplicationModal
        isOpen={addWorkMaterialApplicationModalIsOpen}
        workMaterialGroups={workMaterialGroups}
        applicationId={applicationId}
        prevWorkMaterials={workMaterials}
      />
    </DynamicModuleLoader>
  );
};
