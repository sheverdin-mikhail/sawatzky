import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { WorkTaskGroupItem } from 'entities/WorkTaskGroup';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { getTime } from 'shared/lib/helpers/getTime';
import { parseTimeString } from 'shared/lib/helpers/parseTimeString';
import { addWorkTaskApplicationFormActions } from '../../model/slice/addWorkTaskApplicationFormSlice';
import {
  getAddWorkTaskApplicationFormActualTimeText,
  getAddWorkTaskApplicationFormData,
  getAddWorkTaskApplicationFormSelectedItem,
} from '../../model/selectors/addWorkTaskApplicationFormSelectors';
import { addWorkTaskToApplication } from '../../model/services/addWorkTaskToApplication';
import cls from './SetWorkTaskActualTimeForm.module.scss';

interface SetWorkTaskActualTimeFormProps {
	className?: string;
	onClose?: () => void;
	workTaskGroups?: WorkTaskGroupItem[];

}

export const SetWorkTaskActualTimeForm: React.FC<SetWorkTaskActualTimeFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const selectedItem = useSelector(getAddWorkTaskApplicationFormSelectedItem);
  const actualTimeText = useSelector(getAddWorkTaskApplicationFormActualTimeText);
  const formData = useSelector(getAddWorkTaskApplicationFormData);

  const onSaveHandler = useCallback(() => {
    if (formData && selectedItem) {
      dispatch(addWorkTaskToApplication({
        ...formData,
        workTask: {
          actualTime: parseTimeString(actualTimeText ?? ''),
          workTask: selectedItem.id,
        },
      }));
    }
  }, [formData, dispatch, actualTimeText, selectedItem]);

  const onChangeHandler = useCallback((value: string) => {
    dispatch(addWorkTaskApplicationFormActions.setActualTimeText(value));
  }, [dispatch]);

  const onBackHandler = useCallback(() => {
    dispatch(addWorkTaskApplicationFormActions.setChoseStep());
  }, [dispatch]);

  return (
    <div className={classNames(cls.setWorkTaskActualTimeForm, {}, [className])}>
      <Text title="Выбор услуги" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input
        label={`Время на выполнение "${selectedItem?.name}" :`}
        placeholder={`Рекомендуемое время выполнения работы: ${getTime(selectedItem?.time ?? 0).hours}ч ${getTime(selectedItem?.time ?? 0).minuts}мин`}
        onChange={onChangeHandler}
        value={actualTimeText}
      />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler}>Сохранить</Button>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onBackHandler}>Назад</Button>
      </div>
    </div>
  );
};
