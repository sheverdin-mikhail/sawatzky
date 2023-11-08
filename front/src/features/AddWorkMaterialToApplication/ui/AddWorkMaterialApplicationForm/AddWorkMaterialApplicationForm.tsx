import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { WorkMaterialGroupItem } from 'entities/WorkMaterialGroup';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { addWorkMaterialApplicationFormActions } from '../../model/slice/addWorkMaterialApplicationFormSlice';
import cls from './AddWorkMaterialApplicationForm.module.scss';

interface AddWorkMaterialApplicationFormProps {
	className?: string;
	onClose?: () => void;
	workMaterialGroups?: WorkMaterialGroupItem[];

}

export const AddWorkMaterialApplicationForm: React.FC<AddWorkMaterialApplicationFormProps> = (props) => {
  const { className, workMaterialGroups } = props;

  const dispatch = useAppDispatch();

  const onChangeHandler = (value: SelectOptionType) => {
    workMaterialGroups?.forEach((workMaterialGroup) => {
      const workMaterial = workMaterialGroup.materials?.find((material) => material.id === value.value);
      if (workMaterial) {
        dispatch(addWorkMaterialApplicationFormActions.selectItem(workMaterial));
      }
    });
  };

  const onSaveHandler = useCallback(() => {
    dispatch(addWorkMaterialApplicationFormActions.setActualStep());
  }, [dispatch]);

  return (
    <div className={classNames(cls.addWorkMaterialToApplicationForm, {}, [className])}>
      <Text title="Выбор услуги" textAlign={TextAlign.CENTER} className={cls.title} />
      {
        workMaterialGroups?.map((workMaterialGroup) => (
          <Select
            className={cls.input}
            placeholder={workMaterialGroup.name}
            onChange={onChangeHandler}
            key={`workMaterialGroup_${workMaterialGroup.id}`}
            options={workMaterialGroup.materials?.map((material) => ({
              text: material.name,
              value: material.id,
            })) ?? []}
          />
        ))
      }
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler}>Сохранить</Button>
      </div>
    </div>
  );
};
