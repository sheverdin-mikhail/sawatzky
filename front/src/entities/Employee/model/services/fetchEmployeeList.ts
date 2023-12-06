import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { Employee } from '../type/employee';

export const fetchEmployeeList = createAsyncThunk<
    Employee[],
    void,
    ThunkConfig<string>
>(
  'Employee/fetchEmployeeList',
  async (_, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.get<Employee[]>('/api/v1/employee/');
      if (!response.data) {
        throw new Error('Ошибка получения списка групп материалов');
      }
      return response.data;
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
