export type { WorkObjectGroup, WorkObjectGroupSchema } from './model/types/workObjectGroup';

export { fetchWorkObjectGroupList } from './model/services/fetchWorkObjectGroupList';
export { deleteWorkObjectGroup } from './model/services/deleteWorObjectGroup';

export {
  workObjectGroupActions,
  getWorkObjectGroup,
  workObjectGroupAdapter,
  workObjectGroupReducer,
  workObjectGroupSlice,
} from './model/slice/workObjectGroupSlice';
