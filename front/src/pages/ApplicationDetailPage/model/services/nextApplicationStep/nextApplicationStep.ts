import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { Application } from 'entities/Application';
import { NextStepData } from '../../type/applicationDetail';
import { fetchApplicationDetail } from '../fetchApplicationDetail/fetchApplicationDetail';

export const nextApplicationStep = createAsyncThunk<
    void,
    NextStepData,
    ThunkConfig<string>
>(
  'applicationDetailPage/nextApplicationStep',
  async (data, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.patch<Application>(`/api/v1/applications/update/${data.applicationId}/`, { step: +data.step + 1 });
      if (!response.data) {
        throw new Error('Ошибка сохранения запроса!');
      }
      dispatch(fetchApplicationDetail(data.applicationId));
    } catch (e: any) {
      return rejectWithValue(e.response.message);
    }
  },
);
