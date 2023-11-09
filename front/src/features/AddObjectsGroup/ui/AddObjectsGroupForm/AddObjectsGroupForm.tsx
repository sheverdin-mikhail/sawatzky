import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addWorkObjectGroupFormActions } from '../../model/slice/addWorkObjectGroupSlice';
import { getWorkObjectGroupName } from '../../model/selectors/addWorkObjectGroupSelectors';
import { createWorkObjectGroup } from '../../model/services/services/createWorkObjectGroup';
import cls from './AddObjectsGroupForm.module.scss';

interface AddObjectsGroupFormProps {
	className?: string;
}

export const AddObjectsGroupForm: React.FC<AddObjectsGroupFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const name = useSelector(getWorkObjectGroupName);

  const onChangeNameHandler = useCallback((value: string) => {
    dispatch(addWorkObjectGroupFormActions.setName(value));
  }, [dispatch]);

  const saveHandler = useCallback(() => {
    dispatch(createWorkObjectGroup({ name }));
  }, [name, dispatch]);

  return (
    <div className={classNames(cls.addObjectsGroupForm, {}, [className])}>
      <Text title="Создать группу объектов" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input
        placeholder="Наименование группы объектов"
        value={name}
        className={cls.input}
        onChange={onChangeNameHandler}
      />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} onClick={saveHandler} className={cls.button}>Сохранить</Button>
        <Button theme={ButtonThemes.BLUE_BORDER} className={cls.button}>Отмена</Button>
      </div>
    </div>
  );
};
