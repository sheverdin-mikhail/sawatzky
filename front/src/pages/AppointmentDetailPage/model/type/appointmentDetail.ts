import { EntityState } from "@reduxjs/toolkit";
import { Appointment } from "entities/Appointment";
import { User } from "entities/User";



export interface AppointmentDetailSchema extends EntityState<Appointment> {
    isLoading: boolean;
    error?: string;
    userData?: User;
}



export interface AppointmentInfo extends Omit<
    Appointment, 
    'performer' | 'workTasks' | 'workMaterials' | 'documents' | 'updatedAt' 
> {
}