import { ApplicationStatus } from "entities/Application";



export interface CreateApplicationFormType {
    title?: string;
    description?: string;
    startWorkDate?: string;
    endWorkDate?: string;
}

export interface CreateApplicationData{
    title: string;
    description: string;
    startWorkDate: string;
    endWorkDate: string;
    status: ApplicationStatus;
    creator: number;
}




export interface CreateApplicationSchema {
    data?: CreateApplicationData;
    form: CreateApplicationFormType
    isLoading: boolean;
    error?: string;
    isOpen: boolean;
}