import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkTask } from 'entities/WorkTask';
import { AddPerformerToApplicationFormData } from '../type/addPerformerToApplication';

export const addPerformerToApplication = createAsyncThunk<
    void,
    AddPerformerToApplicationFormData,
    ThunkConfig<string>
>(
  'addPerformerToApplication/addPerformerToApplication',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const data: any = [formData.newPerformer];
      if (formData.prevPerformers) {
        data.push(...formData.prevPerformers);
      }
      const response = await extra.api.patch<WorkTask>(`/api/v1/applications/update/${formData.applicationId}/`, { performers: data });
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
