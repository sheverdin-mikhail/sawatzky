import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { WorkMaterialGroupItem } from 'entities/WorkMaterialGroup';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import {
  getAddWorkMaterialApplicationFormActualCountText,
  getAddWorkMaterialApplicationFormData,
  getAddWorkMaterialApplicationFormSelectedItem,
} from '../../model/selectors/addWorkMaterialApplicationFormSelectors';
import { addWorkMaterialApplicationFormActions } from '../../model/slice/addWorkMaterialApplicationFormSlice';
import { addWorkMaterialToApplication } from '../../model/services/addWorkMaterialToApplication';
import cls from './SetWorkMaterialActualCountForm.module.scss';

interface SetWorkMaterialActualCountFormProps {
	className?: string;
	onClose?: () => void;
	workMaterialGroups?: WorkMaterialGroupItem[];

}

export const SetWorkMaterialActualCountForm: React.FC<SetWorkMaterialActualCountFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const selectedItem = useSelector(getAddWorkMaterialApplicationFormSelectedItem);
  const actualCountText = useSelector(getAddWorkMaterialApplicationFormActualCountText);
  const formData = useSelector(getAddWorkMaterialApplicationFormData);

  const onSaveHandler = useCallback(() => {
    if (formData && selectedItem && actualCountText) {
      dispatch(addWorkMaterialToApplication({
        ...formData,
        workMaterial: {
          actualCount: +actualCountText,
          workMaterial: selectedItem.id,
        },
      }));
    }
  }, [formData, dispatch, actualCountText, selectedItem]);

  const onChangeHandler = useCallback((value: string) => {
    dispatch(addWorkMaterialApplicationFormActions.setActualCountText(value));
  }, [dispatch]);

  const onBackHandler = useCallback(() => {
    dispatch(addWorkMaterialApplicationFormActions.setChoseStep());
  }, [dispatch]);

  return (
    <div className={classNames(cls.setWorkMaterialActualCountForm, {}, [className])}>
      <Text title="Выбор услуги" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input
        label={`Количество материала "${selectedItem?.name}" :`}
        placeholder={`Рекомендуемое количество материала: ${selectedItem?.count}`}
        onChange={onChangeHandler}
        value={actualCountText}
      />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler}>Сохранить</Button>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onBackHandler}>Назад</Button>
      </div>
    </div>
  );
};
