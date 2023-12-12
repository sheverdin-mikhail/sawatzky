import { createSelector } from '@reduxjs/toolkit';
import { ApplicationStatus } from 'entities/Application';
import { ApplicationInfo } from '../type/applicationDetail';
import { getApplicationDetail } from '../slice/applicationDetailSlice';

export const getApplicationDetailInfo = createSelector(
  getApplicationDetail.selectById,
  (application) : ApplicationInfo => (
    {
      id: application?.id || '',
      title: application?.title || '',
      subject: application?.subject || '',
      description: application?.description || '',
      status: application?.status || ApplicationStatus.NEW,
      creator: application?.creator,
      createdAt: application?.createdAt || '',
      startWorkDate: application?.startWorkDate,
      endWorkDate: application?.endWorkDate,
      step: application?.step || 0,

    }
  ),
);

export const getApplicationStep = createSelector(getApplicationDetail.selectById, (application) => application?.step);
