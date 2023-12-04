import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { Select, SelectOptionType } from 'shared/ui/Select/Select';
import { useSelector } from 'react-redux';
import { getWorkObjectGroup } from 'entities/WorkObjectGroup';
import { useCallback, useMemo } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
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
  getCreateLegalEntityFormSettlementAccount,
  getCreateLegalEntityFormWorkObject,
  getCreateLegalEntityFormWorkObjectGroup,
} from '../../model/selectors/createLegalEntitySelectors';
import { createLegalEntityActions } from '../../model/slice/createLegalEntitySlice';
import { addLegalEntity } from '../../model/services/addLegalEntity';
import cls from './CreateLegalEntitySawatzkyForm.module.scss';

interface CreateLegalEntitySawatzkyFormProps {
	className?: string;
}

export const CreateLegalEntitySawatzkyForm: React.FC<CreateLegalEntitySawatzkyFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const formData = useSelector(getCreateLegalEntityFormData);

  const workObjectsGroup = useSelector(getCreateLegalEntityFormWorkObjectGroup);
  const workObject = useSelector(getCreateLegalEntityFormWorkObject);

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

  const workObjectsGroups = useSelector(getWorkObjectGroup.selectAll);

  const onChangeWorkObjectGroup = useCallback((item: SelectOptionType) => {
    dispatch(createLegalEntityActions.setWorkObjectsGroup(+item.value));
  }, [dispatch]);

  const onChangeWorkObject = useCallback((item: SelectOptionType) => {
    dispatch(createLegalEntityActions.setWorkObject(+item.value));
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

  return (
    <div className={classNames(cls.createLegalEntitySawatzkyForm, {}, [className])}>
      <Text title="Создать Юр. лицо Sawatzky" textAlign={TextAlign.CENTER} className={cls.title} />
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
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} className={cls.button} onClick={onSubmitHandler}>Создать</Button>
      </div>
    </div>
  );
};
