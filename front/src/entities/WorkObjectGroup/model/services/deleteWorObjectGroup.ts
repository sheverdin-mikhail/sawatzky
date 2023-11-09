import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkObjectGroup } from '../types/workObjectGroup';
import { fetchWorObjectGroupList } from './fetchWorkObjectGroupList';

export const deleteWorkObjectGroup = createAsyncThunk<
    void,
    number | string,
    ThunkConfig<string>
>(
  'workMaterialGroup/deleteWorkMaterialGroup',
  async (groupId, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.delete<WorkObjectGroup>(`/api/v1/work_material_groups/${groupId}`);
      if (response.status !== 204) {
        throw new Error('Ошибка удаления группы объектов');
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
