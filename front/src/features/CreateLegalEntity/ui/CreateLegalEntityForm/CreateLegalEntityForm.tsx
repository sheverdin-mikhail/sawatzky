import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Switch } from 'shared/ui/Switch/Switch';
import { ReactComponent as BlueFolderIcon } from 'shared/assets/icons/blue-folder-icon.svg';
import { ReactComponent as FolderIcon } from 'shared/assets/icons/folder-icon.svg';
import { FileInput } from 'shared/ui/FileInput/FileInput';
import { Document } from 'entities/Document';
import { DocList } from 'widgets/DocList';
import cls from './CreateLegalEntityForm.module.scss';

interface CreateLegalEntityFormProps {
  className?: string;
}

export const CreateLegalEntityForm: React.FC<CreateLegalEntityFormProps> = (props) => {
  const { className } = props;

  const workObjectGrops = [
    {
      id: '15',
      name: 'Группа объектов № 15',
    },
    {
      id: '16',
      name: 'Группа объектов № 16',
    },
  ];
  const workObjectGropsOptions: SelectOptionType[] = workObjectGrops.map((item) => ({
    value: item.id,
    text: item.name,
  }));

  const workObjects = [
    {
      id: '1',
      code: '12345',
    },
    {
      id: '2',
      code: '12346',
    },
  ];
  const workObjectsOptions: SelectOptionType[] = workObjects.map((item) => ({
    value: item.id,
    text: item.code,
  }));

  const categories = [
    {
      id: '1',
      code: '12345',
    },
    {
      id: '2',
      code: '12346',
    },
    {
      id: '3',
      code: 'hello',
    },
    {
      id: '4',
      code: 'option',
    },
    {
      id: '5',
      code: 'Наименование категории',
    },
  ];
  const categoriesOptions: SelectOptionType[] = categories.map((item) => ({
    value: item.id,
    text: item.code,
  }));

  const docs: Document[] = [
    {
      id: '1', name: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.doxc', createdAt: '12.05.23', docType: 'just', fileUrl: 'www.google.com',
    },
    {
      id: '2', name: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.doxc', createdAt: '12.05.23', docType: 'just', fileUrl: 'www.google.com',
    },
    {
      id: '3', name: 'Сверка данных 2005-2022 гг Сверка данных 2005-2022 гг.doxc', createdAt: '12.05.23', docType: 'just', fileUrl: 'www.google.com',
    },
  ];

  return (
    <div className={classNames(cls.createLegalEntityForm, {}, [className])}>
      <Text title="Создать Контрагента (Юр. лиц Заказчиков)" textAlign={TextAlign.CENTER} className={cls.title} />
      <div className={cls.body}>
        <div className={cls.column}>
          <Select className={cls.input} placeholder="Группа объектов" options={workObjectGropsOptions} />
          <Select className={cls.input} placeholder="Объект" options={workObjectsOptions} />
          <Select className={cls.input} placeholder="Выбор нескольких категорий" options={categoriesOptions} multi />
          <Input placeholder="Название" className={cls.input} />
          <Input placeholder="Руководитель" className={cls.input} />
          <Input placeholder="Юридический адрес" className={cls.input} />
          <Input placeholder="Фактический адрес" className={cls.input} />
          <Input placeholder="Телефон" className={cls.input} />
          <Input placeholder="E-mail" className={cls.input} />
          <Input placeholder="ИНН/КПП" className={cls.input} />
          <Input placeholder="Расчётный счёт" className={cls.input} />
          <Input placeholder="Корреспондентский счёт" className={cls.input} />
          <Input placeholder="Банк" className={cls.input} />
          <Input placeholder="БИК" className={cls.input} />
          <div className={cls.switches}>
            <Switch className={cls.switch} id="pay" label="Работа по предоплате" />
            <Switch className={cls.switch} id="status" label="Статус контрагента" />
          </div>
          <Button className={cls.addLogoBtn} theme={ButtonThemes.CLEAR_BLUE}>+ Добавить логотип компании</Button>
        </div>
        <div className={cls.column}>

          <div className={cls.list}>
            <div className={classNames(cls.folder, {}, [cls.folderCurrent])}><FolderIcon />Другие документы от 20.05.2022</div>
            <DocList className={cls.docList} docs={docs} modal />
          </div>

          <div className={cls.folders}>
            <h2 className={cls.foldersTitle}>Добавить в папку:</h2>
            <div className={cls.folder}><BlueFolderIcon />На подпись</div>
            <div className={cls.folder}><BlueFolderIcon />Документы от Ярмакова</div>
          </div>

          <div className={classNames(cls.folder, {}, [cls.folderNew])}><FolderIcon />Введите название</div>

          <FileInput
            className={cls.fileInput}
            label={(
              <div className={cls.fileInputContent}>
                <p className={cls.textBlack}>Перетащите файлы сюда или кликните для выбора</p>
                <p className={cls.textBlue}>Максимальный объем: 70 MB</p>
              </div>
            )}
          />
        </div>
      </div>
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button}>Создать</Button>
      </div>
    </div>
  );
};
