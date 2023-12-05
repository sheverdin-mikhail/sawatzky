import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { Switch } from 'shared/ui/Switch/Switch';
// import { ReactComponent as BlueFolderIcon } from 'shared/assets/icons/blue-folder-icon.svg';
// import { ReactComponent as FolderIcon } from 'shared/assets/icons/folder-icon.svg';
// import { FileInput } from 'shared/ui/FileInput/FileInput';
// import { Document } from 'entities/Document';
// import { DocList } from 'widgets/DocList';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getWorkObjectGroup } from 'entities/WorkObjectGroup';
import { getWorkTaskGroup } from 'entities/WorkTaskGroup';
import { getWorkMaterialGroup } from 'entities/WorkMaterialGroup';
import { useCallback, useMemo } from 'react';
import cls from './CreateLegalEntityForm.module.scss';
import {
  getCreateLegalEntityFormActualAddress,
  getCreateLegalEntityFormBank,
  getCreateLegalEntityFormBik,
  getCreateLegalEntityFormCorrespondentAccount,
  getCreateLegalEntityFormData,
  getCreateLegalEntityFormHead,
  getCreateLegalEntityFormINN,
  getCreateLegalEntityFormLegalAddress,
  getCreateLegalEntityFormMail,
  getCreateLegalEntityFormName,
  getCreateLegalEntityFormPhone,
  getCreateLegalEntityFormPrepayment,
  getCreateLegalEntityFormSettlementAccount,
  getCreateLegalEntityFormStatus,
  getCreateLegalEntityFormWorkMaterialGroups,
  getCreateLegalEntityFormWorkObject,
  getCreateLegalEntityFormWorkObjectGroup,
  getCreateLegalEntityFormWorkTaskGroups,
} from '../../model/selectors/createLegalEntitySelectors';
import { createLegalEntityActions } from '../../model/slice/createLegalEntitySlice';
import { addLegalEntity } from '../../model/services/addLegalEntity';

interface CreateLegalEntityFormProps {
  className?: string;
}

export const CreateLegalEntityForm: React.FC<CreateLegalEntityFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const formData = useSelector(getCreateLegalEntityFormData);

  const workObjectsGroup = useSelector(getCreateLegalEntityFormWorkObjectGroup);
  const workObject = useSelector(getCreateLegalEntityFormWorkObject);
  const selectedWorkTaskGroups = useSelector(getCreateLegalEntityFormWorkTaskGroups);
  const selectedWorkMaterialGroups = useSelector(getCreateLegalEntityFormWorkMaterialGroups);

  const name = useSelector(getCreateLegalEntityFormName);
  const head = useSelector(getCreateLegalEntityFormHead);
  const legalAddress = useSelector(getCreateLegalEntityFormLegalAddress);
  const actualAddress = useSelector(getCreateLegalEntityFormActualAddress);
  const phone = useSelector(getCreateLegalEntityFormPhone);
  const mail = useSelector(getCreateLegalEntityFormMail);
  const INN = useSelector(getCreateLegalEntityFormINN);
  const settlementAccount = useSelector(getCreateLegalEntityFormSettlementAccount);
  const correspondentAccount = useSelector(getCreateLegalEntityFormCorrespondentAccount);
  const bank = useSelector(getCreateLegalEntityFormBank);
  const bik = useSelector(getCreateLegalEntityFormBik);
  const prepayment = useSelector(getCreateLegalEntityFormPrepayment);
  const status = useSelector(getCreateLegalEntityFormStatus);

  const workObjectsGroups = useSelector(getWorkObjectGroup.selectAll);
  const workTaskGroups = useSelector(getWorkTaskGroup.selectAll);
  const workMaterialGroups = useSelector(getWorkMaterialGroup.selectAll);

  const onChangeWorkObjectGroup = useCallback((item: SelectOptionType) => {
    dispatch(createLegalEntityActions.setWorkObjectsGroup(+item.value));
  }, [dispatch]);

  const onChangeWorkObject = useCallback((item: SelectOptionType) => {
    dispatch(createLegalEntityActions.setWorkObject(+item.value));
  }, [dispatch]);

  const onChangeWorkTaskGroups = useCallback((items: SelectOptionType[]) => {
    dispatch(createLegalEntityActions.setWorkTaskGroups(items.map((item) => +item.value)));
  }, [dispatch]);

  const onChangeWorkMaterialGroups = useCallback((items: SelectOptionType[]) => {
    dispatch(createLegalEntityActions.setWorkMaterialGroups(items.map((item) => +item.value)));
  }, [dispatch]);

  const onSubmitHandler = useCallback(() => {
    if (formData) {
      dispatch(addLegalEntity(formData));
    }
  }, [dispatch, formData]);

  const workObjectOptions = useMemo(() => {
    const workObjects = workObjectsGroups.find((item) => item.id === workObjectsGroup)?.workObjects;
    if (workObjects) {
      return workObjects?.map((item) => ({
        value: item.id,
        text: item.name,
      }));
    }
    return undefined;
  }, [workObjectsGroups, workObjectsGroup]);

  const workObjectGroupOptions: SelectOptionType[] = workObjectsGroups.map((item) => ({ value: item.id, text: item.name }));
  const workTaskGroupOptions: SelectOptionType[] = workTaskGroups.map((item) => ({ value: item.id, text: item.name }));
  const workMaterialGroupOptions: SelectOptionType[] = workMaterialGroups.map((item) => ({ value: item.id, text: item.name }));

  const workObjectOption = useMemo(() => {
    if (workObject) {
      return workObjectOptions?.find((item) => item.value === workObject);
    }
    return undefined;
  }, [workObject, workObjectOptions]);

  const workObjectGroupOption = useMemo(() => {
    if (workObjectsGroup) {
      return workObjectGroupOptions?.find((item) => item.value === workObjectsGroup);
    }
    return undefined;
  }, [workObjectGroupOptions, workObjectsGroup]);

  const selectedWorkTaskGroupOptions = useMemo(() => {
    if (selectedWorkTaskGroups) {
      return workTaskGroupOptions?.filter((item) => selectedWorkTaskGroups.find((object) => object === item.value));
    }
    return undefined;
  }, [workTaskGroupOptions, selectedWorkTaskGroups]);

  const selectedWorkMaterialGroupOptions = useMemo(() => {
    if (selectedWorkMaterialGroups) {
      return workMaterialGroupOptions?.filter((item) => selectedWorkMaterialGroups.find((object) => object === item.value));
    }
    return undefined;
  }, [workMaterialGroupOptions, selectedWorkMaterialGroups]);

  return (
    <div className={classNames(cls.createLegalEntityForm, {}, [className])}>
      <Text title="Создать Контрагента (Юр. лиц Заказчиков)" textAlign={TextAlign.CENTER} className={cls.title} />
      <div className={cls.body}>
        <div className={cls.column}>
          <Select
            className={cls.input}
            placeholder="Группа объектов"
            onChange={onChangeWorkObjectGroup}
            options={workObjectGroupOptions}
            value={workObjectGroupOption}
          />
          {
            workObjectsGroup && (
              <Select
                className={cls.input}
                onChange={onChangeWorkObject}
                placeholder="Объект"
                options={workObjectOptions}
                value={workObjectOption}
              />
            )
          }
          <Select
            className={cls.input}
            placeholder="Выбор нескольких категорий услуг"
            options={workTaskGroupOptions}
            selected={selectedWorkTaskGroupOptions}
            onMultiChange={onChangeWorkTaskGroups}
            multi
          />
          <Select
            className={cls.input}
            placeholder="Выбор нескольких категорий материалов"
            options={workMaterialGroupOptions}
            selected={selectedWorkMaterialGroupOptions}
            onMultiChange={onChangeWorkMaterialGroups}
            multi
          />
          <Input
            placeholder="Название"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setName(value))}
            value={name}
          />
          <Input
            placeholder="Руководитель"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setHead(value))}
            value={head}
          />
          <Input
            placeholder="Юридический адрес"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setLegalAddress(value))}
            value={legalAddress}
          />
          <Input
            placeholder="Фактический адрес"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setActualAddress(value))}
            value={actualAddress}
          />
          <Input
            placeholder="Телефон"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setPhone(value))}
            value={phone}
          />
          <Input
            placeholder="E-mail"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setMail(value))}
            value={mail}
          />
          <Input
            placeholder="ИНН/КПП"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setINN(value))}
            value={INN}
          />
          <Input
            placeholder="Расчётный счёт"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setSettlementAccount(value))}
            value={settlementAccount}
          />
          <Input
            placeholder="Корреспондентский счёт"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setCorrespondentAccount(value))}
            value={correspondentAccount}
          />
          <Input
            placeholder="Банк"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setBank(value))}
            value={bank}
          />
          <Input
            placeholder="БИК"
            className={cls.input}
            onChange={(value) => dispatch(createLegalEntityActions.setBik(value))}
            value={bik}
          />
          <div className={cls.switches}>
            <Switch
              className={cls.switch}
              checked={prepayment}
              id="prepayment"
              label="Работа по предоплате"
              onChange={(value) => dispatch(createLegalEntityActions.setPrepayment(value))}
            />
            <Switch
              className={cls.switch}
              checked={status}
              id="status"
              label="Статус контрагента"
              onChange={(value) => dispatch(createLegalEntityActions.setStatus(value))}
            />
          </div>
          {/* <Button className={cls.addLogoBtn} theme={ButtonThemes.CLEAR_BLUE}>+ Добавить логотип компании</Button> */}
        </div>
        <div className={cls.column}>

          {/* <div className={cls.list}>
            <div className={classNames(cls.folder, {}, [cls.folderCurrent])}><FolderIcon />Другие документы от 20.05.2022</div>
            <DocList className={cls.docList} docs={docs} modal />
          </div> */}

          {/* <div className={cls.folders}>
            <h2 className={cls.foldersTitle}>Добавить в папку:</h2>
            <div className={cls.folder}><BlueFolderIcon />На подпись</div>
            <div className={cls.folder}><BlueFolderIcon />Документы от Ярмакова</div>
          </div> */}

          {/* <div className={classNames(cls.folder, {}, [cls.folderNew])}><FolderIcon />Введите название</div> */}

          {/* <FileInput
            className={cls.fileInput}
            label={(
              <div className={cls.fileInputContent}>
                <p className={cls.textBlack}>Перетащите файлы сюда или кликните для выбора</p>
                <p className={cls.textBlue}>Максимальный объем: 70 MB</p>
              </div>
            )}
          /> */}
        </div>
      </div>
      <div className={cls.buttons}>
        <Button onClick={onSubmitHandler} theme={ButtonThemes.BLUE_SOLID} className={cls.button}>Создать</Button>
      </div>
    </div>
  );
};
