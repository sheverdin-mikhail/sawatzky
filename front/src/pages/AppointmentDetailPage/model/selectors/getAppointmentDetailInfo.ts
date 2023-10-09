import { createSelector } from "@reduxjs/toolkit";
import { AppointmentStatus, getAppointment } from "entities/Appointment";
import { AppointmentInfo } from "../type/appointmentDetail";

export const getAppointmentDetailInfo = createSelector(
    getAppointment.selectById,
    ( appointment ) : AppointmentInfo => (
        {
            id: appointment?.id || '',
            title: appointment?.title || '',
            subject: appointment?.subject || '',
            description: appointment?.description || '',
            status: appointment?.status || AppointmentStatus.NEW,
            creator: appointment?.creator,
            createdAt: appointment?.createdAt || '',
            startWorkDate: appointment?.startWorkDate,
            endWorkDate: appointment?.endWorkDate,
            
        }
    )
)