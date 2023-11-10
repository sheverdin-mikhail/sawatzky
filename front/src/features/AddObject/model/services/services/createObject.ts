import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkObject, fetchWorkObjectList } from 'entities/WorkObject';
import { FormData } from '../../type/addObject';
import { addWorkObjectFormActions } from '../../slice/addObjectSlice';

export const createWorkObject = createAsyncThunk<
    void,
    FormData,
    ThunkConfig<string>
>(
  'addWorkObject/createWorkObject',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<WorkObject>('/api/v1/work_objects/create/', formData);
      if (!response.data) {
        throw new Error('Ошибка создания объекта');
      }
      dispatch(fetchWorkObjectList());
      dispatch(addWorkObjectFormActions.closeModal());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
