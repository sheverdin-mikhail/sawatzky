import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { SawatzkyEmployee } from '../type/sawatzkyEmployee';
import { fetchSawatzkyEmployeeList } from './fetchSawatzkyEmployeeList';

export const deleteWorkObject = createAsyncThunk<
    void,
    number | string,
    ThunkConfig<string>
>(
  'workMaterial/deleteWorkMaterial',
  async (objectId, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.delete<SawatzkyEmployee>(`/api/v1/work_objects/${objectId}`);
      if (response.status !== 204) {
        throw new Error('Ошибка удаления группы объектов');
      }
      dispatch(fetchSawatzkyEmployeeList());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
