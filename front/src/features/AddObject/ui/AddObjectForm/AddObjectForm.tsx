import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonThemes } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addWorkObjectFormActions } from '../../model/slice/addObjectSlice';
import {
  getWorkObjectFormAddress, getWorkObjectFormCode, getWorkObjectFormContractNumber, getWorkObjectFormName, getWorkObjectGroupId,
} from '../../model/selectors/addObjectSelectors';
import { createWorkObject } from '../../model/services/services/createObject';
import cls from './AddObjectForm.module.scss';

interface AddObjectFormProps {
	className?: string;
}

export const AddObjectForm: React.FC<AddObjectFormProps> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const name = useSelector(getWorkObjectFormName);
  const contractNumber = useSelector(getWorkObjectFormContractNumber);
  const code = useSelector(getWorkObjectFormCode);
  const address = useSelector(getWorkObjectFormAddress);
  const groupId = useSelector(getWorkObjectGroupId);

  const onChangeNameHandler = useCallback((value: string) => {
    dispatch(addWorkObjectFormActions.setName(value));
  }, [dispatch]);

  const onChangeCodeHandler = useCallback((value: string) => {
    dispatch(addWorkObjectFormActions.setCode(value));
  }, [dispatch]);

  const onChangeAddressHandler = useCallback((value: string) => {
    dispatch(addWorkObjectFormActions.setAddress(value));
  }, [dispatch]);

  const onChangeContractNumberHandler = useCallback((value: string) => {
    dispatch(addWorkObjectFormActions.setContractNumber(value));
  }, [dispatch]);

  const saveHandler = useCallback(() => {
    dispatch(createWorkObject({
      workObjectGroup: +groupId!!,
      name,
      code,
      address,
      contractNumber,
    }));
  }, [name, dispatch, groupId, code, address, contractNumber]);

  return (
    <div className={classNames(cls.addObjectForm, {}, [className])}>
      <Text title="Создать объект" textAlign={TextAlign.CENTER} className={cls.title} />
      <Input
        placeholder="Наименование объекта"
        value={name ?? ''}
        className={cls.input}
        onChange={onChangeNameHandler}
      />
      <Input
        placeholder="Код объекта"
        value={code ?? ''}
        className={cls.input}
        onChange={onChangeCodeHandler}
      />
      <Input
        placeholder="Адрес объекта"
        value={address ?? ''}
        className={cls.input}
        onChange={onChangeAddressHandler}
      />
      <Input
        placeholder="Номер контракта"
        value={contractNumber ?? ''}
        className={cls.input}
        onChange={onChangeContractNumberHandler}
      />
      <div className={cls.buttons}>
        <Button theme={ButtonThemes.BLUE_SOLID} onClick={saveHandler} className={cls.button}>Сохранить</Button>
      </div>
    </div>
  );
};
