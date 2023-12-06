import { createSelector } from '@reduxjs/toolkit';
import { getApplicationDetail } from '../slice/applicationDetailSlice';

export const getApplicationDetailPerformer = createSelector(getApplicationDetail.selectById, (detail) => detail?.performer);
