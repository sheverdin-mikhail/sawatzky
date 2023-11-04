export type { WorkMaterialGroupSchema, WorkMaterialGroupItem } from './model/type/workMaterialGroup';

export {
    workMaterialGroupActions,
    workMaterialGroupReducer,
    workMaterialGroupAdapter,
    getWorkMaterialGroup
} from './model/slice/workMaterialGroupSlice';

export { fetchWorkMaterialGroupList } from './model/services/fetchWorkMaterialGroupList';
export { deleteWorkMaterialGroup } from './model/services/deleteWorkMaterialGroup';
