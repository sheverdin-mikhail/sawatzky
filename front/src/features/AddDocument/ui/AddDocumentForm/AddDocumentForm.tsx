import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { addDocumentFormActions } from 'features/AddDocument/model/slice/addDocumentFormSlice';
import { useParams } from 'react-router-dom';
import { DocEntity, DocType } from '../../model/type/addDocument';
import { getAddDocumentDocType, getAddDocumentFormData } from '../../model/selectors/addDocumentFormSelectors';
import { addDocumentToApplication } from '../../model/services/addDocumentToApplication';
import cls from './AddDocumentForm.module.scss';

interface AddDocumentFormProps {
	className?: string;
	docEntity?: DocEntity;
	onClose?: () => void;
}

const docTypeOptions: SelectOptionType[] = [
  {
    text: 'Акт',
    value: DocType.ACT,
  },
  {
    text: 'Платежный документ',
    value: DocType.PAYMENT_SLIPS,
  },
  {
    text: 'Доверенность',
    value: DocType.POWEER_OF_ATTORNEY,
  },
  {
    text: 'Прочее',
    value: DocType.OTHER,
  },
];

export const AddDocumentForm: React.FC<AddDocumentFormProps> = (props) => {
  const { className } = props;
  const [file, setFile] = useState<File | undefined>();

  const { id } = useParams();

  const docType = useSelector(getAddDocumentDocType);
  const formData = useSelector(getAddDocumentFormData);
  const dispatch = useAppDispatch();

  const onChangeFile = useCallback((file: File) => {
    setFile(file);
    dispatch(addDocumentFormActions.setFileName(file.name));
  }, [dispatch]);

  const onChangeDocType = useCallback((value: SelectOptionType) => {
    dispatch(addDocumentFormActions.setDocType(value.value as DocType));
  }, [dispatch]);

  const onSaveHandler = useCallback(() => {
    if (formData && id && file) {
      dispatch(addDocumentToApplication({ docEntity: DocEntity.APPLICATION, formData: { ...formData, file }, applicationId: id }));
      setFile(undefined);
    }
  }, [dispatch, formData, id, file]);

  return (
    <div className={classNames(cls.addDocumentForm, {}, [className])}>
      <Text title="Добавить документ" textAlign={TextAlign.CENTER} className={cls.title} />
      <FileInput
        className={cls.input}
        id="file"
        label="Выбрать из списка файлов"
        file={file}
        onFileChange={onChangeFile}
      />
      <Select
        className={cls.input}
        options={docTypeOptions}
        value={docTypeOptions.find((option) => option.value === docType)}
        onChange={onChangeDocType}
        placeholder="Выберите тип загружаемого документа"
      />
      <div className={cls.buttons}>
        <Button
          theme={ButtonThemes.BLUE_SOLID}
          className={cls.button}
          onClick={onSaveHandler}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
