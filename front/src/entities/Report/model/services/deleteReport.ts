import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { Report } from '../type/report';
import { fetchReportList } from './fetchReportList';

export const deleteReport = createAsyncThunk<
  void,
  number | string,
  ThunkConfig<string>
>(
  'report/deleteReport',
  async (reportId, { extra, rejectWithValue, dispatch }) => {
    try {
      // вставить API
      const response = await extra.api.delete<Report>(`/api/v1//${reportId}`);
      if (response.status !== 204) {
        throw new Error('Ошибка удаления отчёта');
      }
      dispatch(fetchReportList());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
