import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { SawatzkyEmployee } from '../type/sawatzkyEmployee';

export const fetchSawatzkyEmployeeList = createAsyncThunk<
    SawatzkyEmployee[],
    void,
    ThunkConfig<string>
>(
  'sawatzkyEmployee/fetchSawatzkyEmployeeList',
  async (_, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.get<SawatzkyEmployee[]>('/api/v1/sawatzky_employee/');
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
