import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { WorkMaterialGroupItem } from 'entities/WorkMaterialGroup';

export const fetchWorkMaterialListByGroupId = createAsyncThunk<
    WorkMaterialGroupItem,
    string,
    ThunkConfig<string>
>(
  'directoryWorkMaterialGroupDetailPage/fetchWorkMaterialListByGroupId',
  async (groupId, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<WorkMaterialGroupItem>(`/api/v1/work_material_groups/${groupId}`);
      if (!response.data) {
        throw new Error('Ошибка сохранения запроса!');
      }
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.message);
    }
  },
);
