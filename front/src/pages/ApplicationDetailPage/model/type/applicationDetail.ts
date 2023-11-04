import { EntityState } from '@reduxjs/toolkit';
import { Application } from 'entities/Application';
import { User } from 'entities/User';

export interface ApplicationDetailSchema extends EntityState<Application> {
    isLoading: boolean;
    error?: string;
    userData?: User;
}

<<<<<<< HEAD
export type ApplicationInfo = Omit<
    Application,
    'performer' | 'workTasks' | 'workMaterials' | 'documents' | 'updatedAt'
>
=======


export type ApplicationInfo = Omit<
    Application, 
    'performer' | 'workTasks' | 'workMaterials' | 'documents' | 'updatedAt' 
>
>>>>>>> main
