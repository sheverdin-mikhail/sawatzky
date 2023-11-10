import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkObject } from '../types/workObject';

export const fetchWorkObjectList = createAsyncThunk<
    WorkObject[],
    void,
    ThunkConfig<string>
>(
  'workObject/fetchWorkObjectList',
  async (_, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.get<WorkObject[]>('/api/v1/work_objects/');
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
