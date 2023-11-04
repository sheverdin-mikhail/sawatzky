import { createSelector } from '@reduxjs/toolkit';
import { ApplicationWorkTask } from 'entities/Application';
import { getApplicationDetail } from '../slice/applicationDetailSlice';

export const getApplicationDetailWorkTasks = createSelector(
    getApplicationDetail.selectById,
    (application) : ApplicationWorkTask[] | undefined => application?.workTasks,
);
