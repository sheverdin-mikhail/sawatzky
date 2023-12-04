import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { CreateSawatzkyEmployeeFormData } from '../type/createSawatzkyEmployee';

export const createSawatzkyEmployee = createAsyncThunk<
    void,
    CreateSawatzkyEmployeeFormData,
    ThunkConfig<string>
>(
  'createSawatzkyEmployee/createSawatzkyEmployee',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<CreateSawatzkyEmployeeFormData>('/api/v1/sawatzky_employee/create/', formData);
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
