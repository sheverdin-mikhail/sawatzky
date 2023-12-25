import { EntityState } from '@reduxjs/toolkit';
import { Document } from 'entities/Document';
import { Employee } from 'entities/Employee';
import { ApplicationPerformer } from 'entities/Performer';
import { WorkMaterial } from 'entities/WorkMaterial';
import { WorkTask } from 'entities/WorkTask';

export enum ApplicationStatus {
    NEW = 'new',
    PROCESSED = 'processed',
    COORDINATION = 'coordination',
    PAYMENT_COORDINATION = 'paymentCoordination',
    IN_WORK = 'inWork',
    FINISHED = 'finished',
    WAITING_FINISH = 'waitingFinish'
}

export interface ApplicationWorkTask {
    workTask: WorkTask;
    actualTime: number;
}

export interface ApplicationWorkMaterial {
    workMaterial: WorkMaterial;
    actualCount: number;
}

export interface Application {
    id: string;
    title: string;
    subject: string;
    description: string;
    status: ApplicationStatus;
    step: number;
    creator?: Employee;
    performers?: ApplicationPerformer[];
    workTasks?: ApplicationWorkTask[];
    workMaterials?: ApplicationWorkMaterial[];
    other?: Document[];
    paymentSlips: Document[];
    acts: Document[];

    createdAt: string;
    updatedAt?: string;
    startWorkDate?: string;
    endWorkDate?: string;
}

export interface ApplicationSchema extends EntityState<Application> {
    isLoading: boolean;
    error?: string;
}
