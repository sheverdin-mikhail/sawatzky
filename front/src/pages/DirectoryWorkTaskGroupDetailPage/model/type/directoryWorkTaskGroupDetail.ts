import { EntityState } from "@reduxjs/toolkit";
import { WorkTask } from "entities/WorkTask";




export interface DirectoryWorkTaskGroupDetailSchema extends EntityState<WorkTask> {

    groupName?: string;
    isLoading?: boolean;
    error?: string;
}