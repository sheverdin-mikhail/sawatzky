import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { useState } from 'react';
import { DocEntity, DocType } from '../../model/type/addDocument';
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
  const [docType, setDocType] = useState<SelectOptionType | undefined>();

  const dispatch = useAppDispatch();

  return (
    <div className={classNames(cls.addDocumentForm, {}, [className])}>
      <Text title="Добавить документ" textAlign={TextAlign.CENTER} className={cls.title} />
      <FileInput
        className={cls.input}
        id="file"
        label="Выбрать из списка файлов"
        file={file}
        onFileChange={(file) => setFile(file)}
      />
      <Select
        className={cls.input}
        options={docTypeOptions}
        value={docType}
        onChange={(value) => setDocType(value)}
        placeholder="Выберите тип загружаемого документа"
      />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button}>Сохранить</Button>
      </div>
    </div>
  );
};
