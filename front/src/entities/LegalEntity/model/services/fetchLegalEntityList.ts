import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { LegalEntity } from '../type/legalEntity';

export const fetchLegalEntityList = createAsyncThunk<
    LegalEntity[],
    boolean | undefined,
    ThunkConfig<string>
>(
  'legalEntity/fetchLegalEntityList',
  async (isSawatzky, { extra, rejectWithValue, dispatch }) => {
    try {
      const params = { sawatzky: Boolean(isSawatzky) };
      const response = await extra.api.get<LegalEntity[]>('/api/v1/entities/', { params });
      if (!response.data) {
        throw new Error('Ошибка получения списка юридических лиц');
      }
      return response.data;
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
