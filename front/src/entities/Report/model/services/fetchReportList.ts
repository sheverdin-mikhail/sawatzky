import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { Report } from '../type/report';

export const fetchReportList = createAsyncThunk<
  Report[],
  void,
  ThunkConfig<string>
>(
  'report/fetchReportList',
  async (_, { extra, rejectWithValue, dispatch }) => {
    try {
      // вставить API
      const response = await extra.api.get<Report[]>('/api/v1/');
      if (!response.data) {
        throw new Error('Ошибка получения списка отчётов');
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
