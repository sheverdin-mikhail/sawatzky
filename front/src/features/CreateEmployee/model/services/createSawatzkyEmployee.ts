import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { fetchSawatzkyEmployeeList } from 'entities/SawatzkyEmployee';
import { CreateSawatzkyEmployeeFormData } from '../type/createEmployee';
import { createEmployeeActions } from '../slice/createEmployeeSlice';

export const createSawatzkyEmployee = createAsyncThunk<
    void,
    CreateSawatzkyEmployeeFormData,
    ThunkConfig<string>
>(
  'createEmployee/createSawatzkyEmployee',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<CreateSawatzkyEmployeeFormData>('/api/v1/sawatzky_employee/create/', formData);
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }
      dispatch(fetchSawatzkyEmployeeList());
      dispatch(createEmployeeActions.closeModal());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
