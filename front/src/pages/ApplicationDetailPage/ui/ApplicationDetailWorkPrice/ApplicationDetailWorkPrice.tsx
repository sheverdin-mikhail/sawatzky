import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { TableItemType, TableType } from 'widgets/Table';
import { getTime } from 'shared/lib/helpers/getTime';
import { CollapsBoard } from 'widgets/CollapsBoard';
import { ApplicationWorkMaterial, ApplicationWorkTask } from 'entities/Application';
import { useTable } from 'shared/lib/hooks/useTable';
import {
  addWorkTaskApplicationFormActions,
  addWorkTaskToApplication,
} from 'features/AddWorkTaskToApplication';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useMemo } from 'react';
import { DocList } from 'widgets/DocList';
import {
  addWorkMaterialApplicationFormActions,
  addWorkMaterialToApplication,
} from 'features/AddWorkMaterialToApplication';
import { addDocumentFormActions } from 'features/AddDocument';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers';
import { Document } from 'entities/Document';
import cls from './ApplicationDetailWorkPrice.module.scss';
import { getApplicationDetail } from '../../model/slice/applicationDetailSlice';
import { fetchApplicationDetail } from '../../model/services/fetchApplicationDetail/fetchApplicationDetail';

interface ApplicationDetailWorkPriceProps {
  className?: string;
  applicationId: string;
  workTasks?: ApplicationWorkTask[];
  workMaterials?: ApplicationWorkMaterial[];
}

export const ApplicationDetailWorkPrice: React.FC<ApplicationDetailWorkPriceProps> = (props) => {
  const { workTasks = [], workMaterials = [], applicationId } = props;

  const dispatch = useAppDispatch();

  const detail = useSelector((state: StateSchema) => getApplicationDetail.selectById(state, applicationId));

  const docList = useMemo<Document[] | undefined>(() => {
    const docs: Document[] = [];
    if (detail?.acts) {
      docs.push(...detail.acts);
    }
    if (detail?.other) {
      docs.push(...detail.other);
    }
    if (detail?.paymentSlips) {
      docs.push(...detail.paymentSlips);
    }
    if (docs) {
      return docs;
    }
    return undefined;
  }, [detail]);

  const payList: Document[] | undefined = detail?.paymentSlips;

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

  const onDeleteMaterialHandler = useCallback((item: TableItemType) => {
    dispatch(addWorkMaterialToApplication({
      prevWorkMaterials: workMaterials
        .filter((material) => material.workMaterial.id !== item.id)
        .map((item) => ({
          workMaterial: item.workMaterial.id,
          actualCount: item.actualCount,
        })),
      applicationId,
    }));
  }, [dispatch, workMaterials, applicationId]);

  const onDeleteTaskHandler = useCallback((item: TableItemType) => {
    dispatch(addWorkTaskToApplication({
      prevWorkTasks: workTasks
        .filter((material) => material.workTask.id !== item.id)
        .map((item) => ({
          workTask: item.workTask.id,
          actualTime: item.actualTime,
        })),
      applicationId,
    }));
  }, [dispatch, workTasks, applicationId]);

  const { Table: WorkTasksTable } = useTable({
    data: workTasksTable,
    className: cls.table,
    onDelete: onDeleteTaskHandler,
  });

  const { Table: WorkMaterialsTable } = useTable({
    data: workMaterialsTable,
    className: cls.table,
    onDelete: onDeleteMaterialHandler,
  });

  return (
    <div>
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
        <Button
          theme={ButtonThemes.CLEAR_BLUE}
          className={cls.controlBtn}
          onClick={() => dispatch(addDocumentFormActions.openModal())}
        >+ Загрузить документ
        </Button>
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

        { docList?.length !== 0 && <DocList onDelete={() => dispatch(fetchApplicationDetail(applicationId))} docs={docList} title="Список документов" /> }
        { payList?.length !== 0 && <DocList docs={payList} onDelete={() => dispatch(fetchApplicationDetail(applicationId))} title="Платежный документ" /> }
      </CollapsBoard>

    </div>
  );
};
