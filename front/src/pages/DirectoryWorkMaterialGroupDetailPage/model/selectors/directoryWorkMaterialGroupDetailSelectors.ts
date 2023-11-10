import { StateSchema } from 'app/providers';

export const getWorkMaterialGroupName = (state: StateSchema) => state.directoryWorkMaterialGroupDetail?.groupName;
export const getWorkMaterialGroupId = (state: StateSchema) => state.directoryWorkMaterialGroupDetail?.groupId;
