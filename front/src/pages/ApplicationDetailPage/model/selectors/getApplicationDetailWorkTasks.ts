import { createSelector } from "@reduxjs/toolkit";
import { getApplicationDetail } from "../slice/applicationDetailSlice";
import { ApplicationWorkTask } from "entities/Application";

export const getApplicationDetailWorkTasks = createSelector(
    getApplicationDetail.selectById,
    (application): ApplicationWorkTask[] | undefined => application?.workTasks
)
