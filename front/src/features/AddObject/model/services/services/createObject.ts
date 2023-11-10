import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkObject } from 'entities/WorkObject';
import { fetchWorkObjectGroupList } from 'entities/WorkObjectGroup';
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
      dispatch(fetchWorkObjectGroupList());
      dispatch(addWorkObjectFormActions.closeModal());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
