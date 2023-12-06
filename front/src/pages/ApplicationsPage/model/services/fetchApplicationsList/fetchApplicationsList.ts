import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { AxiosRequestConfig } from 'axios';
import { Application } from 'entities/Application';
import { userActions } from 'entities/User';

export const fetchApplicationsList = createAsyncThunk<
    Application[],
    AxiosRequestConfig<any> | undefined,
    ThunkConfig<string>
>(
  'applicationsPage/fetchApplicationsList',
  async (params, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.get<Application[]>('/api/v1/applications/', params);
      if (!response.data) {
        throw new Error('Ошибка получения списка запросов!');
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
