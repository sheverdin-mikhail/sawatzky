import { EntityState } from "@reduxjs/toolkit";
import { Appointment } from "entities/Appointment";



export interface AppointmentDetailSchema extends EntityState<Appointment> {
    isLoading: boolean;
    error?: string;
}