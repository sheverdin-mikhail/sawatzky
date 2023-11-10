export {
  addWorkObjectGroupFormActions,
  addWorkObjectGroupFormReducer,
} from './model/slice/addWorkObjectGroupSlice';

export { AddObjectsGroupModal } from './ui/AddObjectsGroupModal/AddObjectsGroupModal';

export type { AddWorkObjectGroupFormSchema } from './model/type/addWorkObjectGroup';

export {
  getWorkObjectGroupFormError,
  getWorkObjectGroupFormIsLoading,
  getWorkObjectGroupFormIsOpen,
  getWorkObjectGroupFormName,
} from './model/selectors/addWorkObjectGroupSelectors';
