import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkObjectGroup, fetchWorObjectGroupList } from 'entities/WorkObjectGroup';
import { FormData } from '../../type/addWorkObjectGroup';

export const createWorkObjectGroup = createAsyncThunk<
    void,
    FormData,
    ThunkConfig<string>
>(
  'addWorkObjectGroup/createWorkObjectGroup',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<WorkObjectGroup>('/api/v1/work_objects_groups/create/', formData);
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }
      dispatch(fetchWorObjectGroupList());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
