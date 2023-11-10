import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { getAddWorkMaterialGroupFormData } from '../../model/selectors/addWorkMaterialGroupFormSelectors';
import cls from './AddWorkMaterialGroupForm.module.scss';
import { addWorkMaterialGroupFormActions } from '../../model/slice/addWorkMaterialGroupFormSlice';
import { createWorkMaterialGroup } from '../../model/services/createWorkMaterialGroup';

interface AddWorkMaterialGroupFormProps {
	className?: string;
	onClose?: () => void;
}

export const AddWorkMaterialGroupForm: React.FC<AddWorkMaterialGroupFormProps> = (props) => {
  const { className } = props;

  const formData = useSelector(getAddWorkMaterialGroupFormData);
  const dispatch = useAppDispatch();

  const onNameChangeHandler = useCallback((value: string) => {
    dispatch(addWorkMaterialGroupFormActions.setFormData({
      name: value,
    }));
  }, [dispatch]);

  const onSaveHandler = useCallback(() => {
    if (formData) {
      dispatch(createWorkMaterialGroup(formData));
    }
  }, [formData, dispatch]);

  return (
    <div className={classNames(cls.addWorkMaterialGroupForm, {}, [className])}>
      <Text title="Создать группу материалов" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input placeholder="Наименование группы" className={cls.input} value={formData?.name} onChange={onNameChangeHandler} />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler}>Сохранить</Button>
      </div>
    </div>
  );
};
