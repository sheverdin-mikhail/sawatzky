import { createSelector } from "@reduxjs/toolkit";
import { getAppointmentDetailInfo } from "./getAppointmentDetailInfo";

export const getAppointmentDetailTitle = createSelector(
    getAppointmentDetailInfo,
    ( appointment )=> appointment?.title
)