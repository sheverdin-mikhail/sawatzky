export {
  addWorkObjectFormActions,
  addWorkObjectFormReducer,
} from './model/slice/addObjectSlice';

export { AddObjectModal } from './ui/AddObjectModal/AddObjectModal';

export type { AddWorkObjectFormSchema } from './model/type/addObject';

export {
  getWorkObjectFormError,
  getWorkObjectFormIsLoading,
  getWorkObjectFormIsOpen,
  getWorkObjectFormName,
  getWorkObjectGroupId,
  getWorkObjectFormAddress,
  getWorkObjectFormCode,
  getWorkObjectFormContractNumber,
} from './model/selectors/addObjectSelectors';
