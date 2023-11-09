import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { Switch } from 'shared/ui/Switch/Switch';
import {
  getAddWorkMaterialCount,
  getAddWorkMaterialName,
  getAddWorkMaterialPrice,
  getAddWorkMaterialStatus,
} from '../../model/selectors/addWorkMaterialFormSelectors';
import { addWorkMaterialFormActions } from '../../model/slice/addWorkMaterialFormSlice';
import { createWorkMaterial } from '../../model/services/createWorkMaterial';
import cls from './AddWorkMaterialForm.module.scss';

interface AddWorkMaterialFormProps {
	className?: string;
	groupId?: number;
	onClose?: () => void;
}

export const AddWorkMaterialForm: React.FC<AddWorkMaterialFormProps> = (props) => {
  const { className, groupId } = props;

  const name = useSelector(getAddWorkMaterialName);
  const price = useSelector(getAddWorkMaterialPrice);
  const count = useSelector(getAddWorkMaterialCount);
  const status = useSelector(getAddWorkMaterialStatus);

  const dispatch = useAppDispatch();

  const onNameChangeHandler = useCallback((value: string) => {
    dispatch(addWorkMaterialFormActions.setName(value));
  }, [dispatch]);

  const onPriceChangeHandler = useCallback((value: string) => {
    dispatch(addWorkMaterialFormActions.setPrice(value));
  }, [dispatch]);

  const onCountChangeHandler = useCallback((value: string) => {
    dispatch(addWorkMaterialFormActions.setCount(value));
  }, [dispatch]);

  const onStatusChangeHandler = useCallback((value: boolean) => {
    dispatch(addWorkMaterialFormActions.setStatus(value));
  }, [dispatch]);

  const onSaveHandler = useCallback(() => {
    dispatch(createWorkMaterial({
      name,
      price,
      workMaterialGroup: groupId,
      status,
      count,
    }));
  }, [dispatch, name, price, groupId, status, count]);

  return (
    <div className={classNames(cls.AddWorkMaterialForm, {}, [className])}>
      <Text title="Создать материал" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input placeholder="Название материала" className={cls.input} value={name ?? ''} onChange={onNameChangeHandler} />
      <Input
        placeholder="500 ₽"
        label="Стоимость материала за шт."
        id="price"
        className={cls.inputWithLabel}
        value={price ?? ''}
        onChange={onPriceChangeHandler}
      />
      <Input
        placeholder="10"
        label="Рекомендованное количество материала, шт."
        id="count"
        className={cls.inputWithLabel}
        value={count ?? ''}
        onChange={onCountChangeHandler}
      />
      <Switch className={cls.switch} label="Статус материала" id="status" checked={status ?? false} onChange={onStatusChangeHandler} />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler}>Сохранить</Button>
      </div>
    </div>
  );
};
