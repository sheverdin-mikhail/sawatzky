import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useMemo } from 'react';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { ApplicationPerformer, Performer, PerformerPriority } from 'entities/Performer';
import { addPerformerToApplication } from 'features/AddPerformerToApplication/model/services/addPerformerToApplication';
import { addPerformerToApplicationFormActions } from 'features/AddPerformerToApplication/model/slice/addPerformerToApplicationFormSlice';
import {
  getAddPerformerToApplicationFormData,
  getAddPerformerToApplicationPerformer, getAddPerformerToApplicationPriority,
} from '../../model/selectors/addPerformerToApplicationSelectors';
import cls from './AddPerformerToApplicationForm.module.scss';

interface AddPerformerToApplicationFormProps {
	className?: string;
	performers?: Performer[];
	onClose?: () => void;
  applicationId: string;
  prevPerformers?: ApplicationPerformer[];
}

const priorities: SelectOptionType[] = [
  {
    text: 'Cрочно',
    value: PerformerPriority.URGENT,
  },
  {
    value: PerformerPriority.NOT_URGEN,
    text: 'Не срочно',
  },
];

export const AddPerformerToApplicationForm: React.FC<AddPerformerToApplicationFormProps> = (props) => {
  const {
    className, performers, prevPerformers, applicationId,
  } = props;

  const performer = useSelector(getAddPerformerToApplicationPerformer);
  const priority = useSelector(getAddPerformerToApplicationPriority);
  const formData = useSelector(getAddPerformerToApplicationFormData);

  const dispatch = useAppDispatch();

  const onChangePerformer = useCallback((item: SelectOptionType) => {
    dispatch(addPerformerToApplicationFormActions.setPerformer(item.value));
  }, [dispatch]);

  const onChangePriority = useCallback((item: SelectOptionType) => {
    dispatch(addPerformerToApplicationFormActions.setPriority(`${item.value}`));
  }, [dispatch]);

  const performerOptions: SelectOptionType[] | undefined = useMemo(() => performers?.map((performer) => ({
    text: performer.user.fio ?? '',
    value: performer.id ?? '',
  })), [performers]);

  const performerValue = useMemo(() => performerOptions?.find((item) => item.value === performer), [performer, performerOptions]);
  const priorityValue = useMemo(() => priorities?.find((item) => item.value === priority), [priority]);

  const onSaveHandler = useCallback(() => {
    if (formData) {
      dispatch(addPerformerToApplication({ ...formData, prevPerformers, applicationId }));
    }
  }, [dispatch, formData, applicationId, prevPerformers]);

  return (
    <div className={classNames(cls.addPerformerToApplicationForm, {}, [className])}>
      <Text title="Добавление исполнителя" textAlign={TextAlign.CENTER} className={cls.title} />
      <Select
        placeholder="Исполнитель"
        className={cls.inputWithLabel}
        value={performerValue}
        options={performerOptions}
        onChange={onChangePerformer}
      />
      <Select
        placeholder="Приоритет"
        className={cls.inputWithLabel}
        value={priorityValue}
        onChange={onChangePriority}
        options={priorities}
      />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSaveHandler}>Добавить</Button>
      </div>
    </div>
  );
};
