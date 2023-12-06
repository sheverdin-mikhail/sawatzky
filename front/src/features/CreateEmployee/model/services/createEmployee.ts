import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { fetchEmployeeList } from 'entities/Employee';
import { CreateEmployeeFormData } from '../type/createEmployee';
import { createEmployeeActions } from '../slice/createEmployeeSlice';

export const createEmployee = createAsyncThunk<
    void,
    CreateEmployeeFormData,
    ThunkConfig<string>
>(
  'createEmployee/createEmployee',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<CreateEmployeeFormData>('/api/v1/employee/create/', formData);
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }
      dispatch(fetchEmployeeList());
      dispatch(createEmployeeActions.closeModal());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
