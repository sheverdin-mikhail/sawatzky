import { EntityState } from '@reduxjs/toolkit';
<<<<<<< HEAD
import { Employee } from 'entities/Employee';
import { WorkTask } from 'entities/WorkTask';
=======
import { Employee } from "entities/Employee";
import { WorkTask } from "entities/WorkTask";

>>>>>>> main

export enum ApplicationStatus {
    NEW ='new',
    PROCESSED='processed',
    COORDINATION = 'coordination',
    PAYMENT_COORDINATION = 'paymentCoordination',
    IN_WORK = 'inWork',
    FINISHED = 'finished'
}

export interface ApplicationWorkTask {
    workTask: WorkTask;
    actualTime: number;
}

export interface ApplicationWorkMaterial {
    workTask: WorkTask;
    actualCount: number;
}

export interface ApplicationWorkTask {
    workTask: WorkTask;
    actualTime: number;
}

export interface ApplicationWorkMaterial {
    workTask: WorkTask;
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
    performer?: Employee;
    workTasks?: ApplicationWorkTask[];
    workMaterials?: ApplicationWorkMaterial[];
<<<<<<< HEAD
    documents?: Document[]; // Поменять когда появится модель документов
=======
    documents?: Document[]; //Поменять когда появится модель документов
>>>>>>> main

    createdAt: string;
    updatedAt?: string;
    startWorkDate?: string;
    endWorkDate?: string;
}

export interface ApplicationSchema extends EntityState<Application> {
    isLoading: boolean;
    error?: string;
}
