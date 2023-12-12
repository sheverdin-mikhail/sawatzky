import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { LegalEntity } from '../type/legalEntity';

export const deleteLegalEntity = createAsyncThunk<
  void,
  number | string,
  ThunkConfig<string>
>(
  'legalEntity/deleteLegalEntity',
  async (legalEntityId, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.delete<LegalEntity>(`/api/v1/entities/${legalEntityId}`);
      if (response.status !== 204) {
        throw new Error('Ошибка удаления юр. лица');
      }
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
