import { EntityState } from '@reduxjs/toolkit';
import { WorkTask } from "entities/WorkTask";


export interface WorkTaskGroupItem {
    id: number;
    name: string;
    workTasks?: WorkTask[];
}


export interface WorkTaskGroupSchema extends EntityState<WorkTaskGroupItem> {

    isLoading?: boolean;
    error?: string;

    workTasksGroupList?: WorkTaskGroupItem[];


}