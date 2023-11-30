import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkTaskGroupItem, fetchWorkTaskGroupList } from 'entities/WorkTaskGroup';
import { AddWorkTaskFormData } from 'features/AddWorkTask';

export const createSawatzkyEmployee = createAsyncThunk<
    void,
    AddWorkTaskFormData,
    ThunkConfig<string>
>(
  'createSawatzkyEmployee/createSawatzkyEmployee',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<WorkTaskGroupItem>('/api/v1/sawatzky_employee/create/', formData);
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }

      dispatch(fetchWorkTaskGroupList());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
