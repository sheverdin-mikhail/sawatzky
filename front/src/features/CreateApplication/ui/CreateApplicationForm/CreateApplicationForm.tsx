import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { DateInput } from 'shared/ui/DateInput/DateInput';
import { Textarea } from 'shared/ui/Textarea/Textarea';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RangePickerSelectedDays } from 'react-trip-date/dist/rangePicker/rangePicker.type';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  getFormApplication,
  getFormApplicationDescription,
  getFormApplicationEndWorkDate,
  getFormApplicationStartWorkDate,
  getFormApplicationTitle,
  getFormApplicationError,
  getFormApplicationSubject,
} from '../../model/selectors/createApplicationSelectors';
import { createApplicationActions, createApplicationReducer } from '../../model/slice/createApplicationSlice';
import cls from './CreateApplicationForm.module.scss';
import { saveApplication } from '../../model/serivces/saveApplication/saveApplication';

interface CreateApplicationFormProps {
	className?: string;
	onClose?: () => void;
}

const reducers: ReducersList = {
  createApplication: createApplicationReducer,
};

export const CreateApplicationForm: React.FC<CreateApplicationFormProps> = (props) => {
  const { className, onClose } = props;

  const dispatch = useAppDispatch();
  const title = useSelector(getFormApplicationTitle);
  const subject = useSelector(getFormApplicationSubject);
  const description = useSelector(getFormApplicationDescription);
  const startWorkDate = useSelector(getFormApplicationStartWorkDate);
  const endWorkDate = useSelector(getFormApplicationEndWorkDate);
  const form = useSelector(getFormApplication);
  const error = useSelector(getFormApplicationError);

  const changeSelectedDaysHandler = useCallback((dates: RangePickerSelectedDays) => {
    if (dates.from) {
      dispatch(createApplicationActions.setStartWorkDate(dates.from));
    }
    if (dates.to) {
      dispatch(createApplicationActions.setEndWorkDate(dates.to));
    }
  }, [dispatch]);
  const changeTitleHandler = useCallback((value: string) => {
    dispatch(createApplicationActions.setTitle(value));
  }, [dispatch]);
  const changeSubjectHandler = useCallback((value: string) => {
    dispatch(createApplicationActions.setSubject(value));
  }, [dispatch]);
  const changeDescriptionHandler = useCallback((value: string) => {
    dispatch(createApplicationActions.setDescription(value));
  }, [dispatch]);

  const clearWorkDatesHandler = useCallback(() => {
    dispatch(createApplicationActions.clearWorkDates());
  }, [dispatch]);

  const onClearhandler = useCallback(() => {
    dispatch(createApplicationActions.clearForm());
    onClose?.();
  }, [dispatch, onClose]);

  const onSaveHandler = useCallback(() => {
    if (form) {
      dispatch(saveApplication(form));
    }
  }, [form, dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.createApplicationForm, {}, [className])}>
        <Text title="Создание запроса" text="Информация по запросу" className={cls.title} textAlign={TextAlign.CENTER} />
        <Input className={cls.input} value={title} onChange={changeTitleHandler} placeholder="Название запроса" />
        <Textarea
          placeholder="Предмет запроса"
          value={subject}
          onChange={changeSubjectHandler}
          className={cls.input}
        />
        <Textarea
          placeholder="Описание запроса"
          value={description}
          onChange={changeDescriptionHandler}
          className={cls.input}
        />
        <DateInput
          className={cls.input}
          onChange={changeSelectedDaysHandler}
          selectedDays={{ from: startWorkDate, to: endWorkDate }}
          onClear={clearWorkDatesHandler}
        />
        <div className={cls.buttons}>
          <Button className={cls.button} onClick={onSaveHandler}>Сохранить</Button>
          <Button className={cls.button} onClick={onClearhandler} theme={ButtonThemes.BLUE_BORDER}>Отмена</Button>
        </div>
      </div>
      { error && <Text className={cls.error} text={error} theme={TextTheme.ERROR} /> }
    </DynamicModuleLoader>
  );
};
