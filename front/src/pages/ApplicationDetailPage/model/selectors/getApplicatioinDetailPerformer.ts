import { createSelector } from '@reduxjs/toolkit';
import { getApplicationDetail } from '../slice/applicationDetailSlice';

export const getApplicationDetailPerformers = createSelector(getApplicationDetail.selectById, (detail) => detail?.performers);
