export type { WorkObjectGroup } from './model/types/workObjectGroup';

export { fetchWorObjectGroupList } from './model/services/fetchWorkObjectGroupList';
export { deleteWorkObjectGroup } from './model/services/deleteWorObjectGroup';

export {
  workObjectGroupActions,
  getworkObjectGroup,
  workObjectGroupAdapter,
  workObjectGroupReducer,
  workObjectGroupSlice,
} from './model/slice/workObjectGroupSlice';
