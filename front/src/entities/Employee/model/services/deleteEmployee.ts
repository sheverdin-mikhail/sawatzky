import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { Employee } from '../type/employee';
import { fetchEmployeeList } from './fetchEmployeeList';

export const deleteWorkObject = createAsyncThunk<
    void,
    number | string,
    ThunkConfig<string>
>(
  'workMaterial/deleteWorkMaterial',
  async (objectId, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.delete<Employee>(`/api/v1/employee/${objectId}`);
      if (response.status !== 204) {
        throw new Error('Ошибка удаления группы объектов');
      }
      dispatch(fetchEmployeeList());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
