import { createSelector } from '@reduxjs/toolkit';
import { ApplicationWorkTask, ApplicationWorkMaterial } from 'entities/Application';
import { getApplicationDetail } from '../slice/applicationDetailSlice';

export const getApplicationDetailWorkTasks = createSelector(
  getApplicationDetail.selectById,
  (application) : ApplicationWorkTask[] | undefined => application?.workTasks,
);

export const getApplicationDetailWorkMaterials = createSelector(
  getApplicationDetail.selectById,
  (application) : ApplicationWorkMaterial[] | undefined => application?.workMaterials,
);
