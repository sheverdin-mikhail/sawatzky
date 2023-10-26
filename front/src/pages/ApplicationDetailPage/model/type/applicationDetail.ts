import { EntityState } from "@reduxjs/toolkit";
import { Application } from "entities/Application";
import { User } from "entities/User";
import { WorkTask } from "entities/WorkTask";



export interface ApplicationDetailSchema extends EntityState<Application> {
    isLoading: boolean;
    error?: string;
    userData?: User;
}



export interface ApplicationInfo extends Omit<
    Application, 
    'performer' | 'workTasks' | 'workMaterials' | 'documents' | 'updatedAt' 
> {
}