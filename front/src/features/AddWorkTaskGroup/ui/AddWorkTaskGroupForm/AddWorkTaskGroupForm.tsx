import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getAddWorkTaskGroupFormData } from 'features/AddWorkTaskGroup/model/selectors/addWorkTaskGroupFormSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { addWorkTaskGroupFormActions } from 'features/AddWorkTaskGroup/model/slice/addWorkTaskGroupFormSlice';
import { createWorkTaskGroup } from 'features/AddWorkTaskGroup/model/services/createWorkTaskGroup';
import cls from './AddWorkTaskGroupForm.module.scss';

interface AddWorkTaskGroupFormProps {
	className?: string;
	onClose?: () => void;
}

export const AddWorkTaskGroupForm: React.FC<AddWorkTaskGroupFormProps> = (props) => {
  const { className } = props;

  const formData = useSelector(getAddWorkTaskGroupFormData);
  const dispatch = useAppDispatch();

  const onNameChangeHandler = useCallback((value: string) => {
    dispatch(addWorkTaskGroupFormActions.setFormData({
      name: value,
    }));
  }, [dispatch]);

  const onSaveHandler = useCallback(() => {
    if (formData) {
      dispatch(createWorkTaskGroup(formData));
    }
  }, [formData, dispatch]);

  return (
    <div className={classNames(cls.addWorkTaskGroupForm, {}, [className])}>
      <Text title="Создать группу услуг" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input placeholder="Наименование группы" className={cls.input} value={formData?.name} onChange={onNameChangeHandler} />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler}>Сохранить</Button>
      </div>
    </div>
  );
};
