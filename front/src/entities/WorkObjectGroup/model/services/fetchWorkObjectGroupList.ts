import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkObjectGroup } from '../types/workObjectGroup';

export const fetchWorObjectGroupList = createAsyncThunk<
    WorkObjectGroup[],
    void,
    ThunkConfig<string>
>(
  'workObjectGroup/fetchWorkObjectGroupList',
  async (_, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.get<WorkObjectGroup[]>('/api/v1/work_objects_groups/');
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
