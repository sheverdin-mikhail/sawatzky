import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { Switch } from 'shared/ui/Switch/Switch';
import { parseTimeString } from 'shared/lib/helpers/parseTimeString';
import {
  getAddWorkTaskName, getAddWorkTaskPrice, getAddWorkTaskStatus, getAddWorkTaskTime,
} from '../../model/selectors/addWorkTaskFormSelectors';
import { addWorkTaskFormActions } from '../../model/slice/addWorkTaskFormSlice';
import { createWorkTask } from '../../model/services/createWorkTask';
import cls from './AddWorkTaskForm.module.scss';

interface AddWorkTaskFormProps {
	className?: string;
	groupId?: number;
	onClose?: () => void;
}

export const AddWorkTaskForm: React.FC<AddWorkTaskFormProps> = (props) => {
  const { className, groupId } = props;

  const name = useSelector(getAddWorkTaskName);
  const price = useSelector(getAddWorkTaskPrice);
  const time = useSelector(getAddWorkTaskTime);
  const status = useSelector(getAddWorkTaskStatus);

  const dispatch = useAppDispatch();

  const onNameChangeHandler = useCallback((value: string) => {
    dispatch(addWorkTaskFormActions.setName(value));
  }, [dispatch]);

  const onPriceChangeHandler = useCallback((value: string) => {
    dispatch(addWorkTaskFormActions.setPrice(value));
  }, [dispatch]);

  const onTimeChangeHandler = useCallback((value: string) => {
    dispatch(addWorkTaskFormActions.setTime(value));
  }, [dispatch]);

  const onStatusChangeHandler = useCallback((value: boolean) => {
    dispatch(addWorkTaskFormActions.setStatus(value));
  }, [dispatch]);

  const onSaveHandler = useCallback(() => {
    dispatch(createWorkTask({
      name,
      price,
      workTaskGroup: groupId,
      status,
      time: parseTimeString(time ?? '').toString(),
    }));
  }, [dispatch, name, price, groupId, status, time]);

  return (
    <div className={classNames(cls.AddWorkTaskForm, {}, [className])}>
      <Text title="Создать услугу" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input placeholder="Название услуги" className={cls.input} value={name ?? ''} onChange={onNameChangeHandler} />
      <Input
        placeholder="500 ₽"
        label="Стоимость часа"
        id="price"
        className={cls.inputWithLabel}
        value={price ?? ''}
        onChange={onPriceChangeHandler}
      />
      <Input
        placeholder="1 час 20 мин"
        label="Рекомендованный срок выполнения работ"
        id="time"
        className={cls.inputWithLabel}
        value={time ?? ''}
        onChange={onTimeChangeHandler}
      />
      <Switch className={cls.switch} label="Статус услуги" id="status" checked={status ?? false} onChange={onStatusChangeHandler} />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler}>Сохранить</Button>
      </div>
    </div>
  );
};
