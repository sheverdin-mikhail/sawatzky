import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { WorkMaterialGroupItem, fetchWorkMaterialGroupList } from 'entities/WorkMaterialGroup';
import { AddWorkMaterialGroupFormData } from '../../model/type/addWorkMaterialGroup';

export const createWorkMaterialGroup = createAsyncThunk<
    void,
    AddWorkMaterialGroupFormData,
    ThunkConfig<string>
>(
  'addWorkMaterialGroup/createWorkMaterialGroup',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<WorkMaterialGroupItem>('/api/v1/work_material_groups/create/', formData);
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }

      dispatch(fetchWorkMaterialGroupList());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
