import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkObject } from '../types/workObject';
import { fetchWorkObjectList } from './fetchWorkObjectList';

export const deleteWorkObject = createAsyncThunk<
    void,
    number | string,
    ThunkConfig<string>
>(
  'workMaterial/deleteWorkMaterial',
  async (objectId, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.delete<WorkObject>(`/api/v1/work_objects/${objectId}`);
      if (response.status !== 204) {
        throw new Error('Ошибка удаления группы объектов');
      }
      dispatch(fetchWorkObjectList());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
