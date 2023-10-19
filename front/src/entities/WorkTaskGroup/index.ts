export type { WorkTaskGroupSchema, WorkTaskGroupItem } from './model/type/workTaskGroup';

export { 
    workTaskGroupActions, 
    workTaskGroupReducer, 
    workTaskGroupAdapter,
    getWorkTaskGroup
} from './model/slice/workTaskGroupSlice';

export { fetchWorkTaskGroupList } from './model/services/fetchWorkTaskGroupList';
export { deleteWorkTaskGroup } from './model/services/deleteWorkTaskGroup';