import { EntityState } from '@reduxjs/toolkit';
import { Application } from 'entities/Application';
import { User } from 'entities/User';

export interface ApplicationDetailSchema extends EntityState<Application> {
    isLoading: boolean;
    error?: string;
    userData?: User;
}

export type ApplicationInfo = Omit<
    Application,
    'performer' | 'workTasks' | 'workMaterials' | 'other' | 'paymentSlips' | 'acts' | 'updatedAt'
>

export interface NextStepData {
    step: number;
    applicationId: string;
}

export interface ChangePerformerStatusData {
    performer: number;
    status: string;
    applicationId: string;
}
