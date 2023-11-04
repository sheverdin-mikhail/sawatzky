import { StateSchema } from 'app/providers';

export const getWorkTaskGroupName = (state: StateSchema) => state.directoryWorkTaskGroupDetail?.groupName;
export const getWorkTaskGroupId = (state: StateSchema) => state.directoryWorkTaskGroupDetail?.groupId;
