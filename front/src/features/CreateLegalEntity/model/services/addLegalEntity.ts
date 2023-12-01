import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { CreateLegalEntityFormData } from '../type/createLegalEntity';

export const createSawatzkyEmployee = createAsyncThunk<
    void,
    CreateLegalEntityFormData,
    ThunkConfig<string>
>(
  'createEmployee/createEmployee',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<CreateLegalEntityFormData>('/api/v1/entity/create/', formData);
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
