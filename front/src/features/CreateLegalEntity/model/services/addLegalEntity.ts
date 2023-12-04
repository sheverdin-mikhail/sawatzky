import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { CreateLegalEntityFormData } from '../type/createLegalEntity';
import { createLegalEntityActions } from '../slice/createLegalEntitySlice';

export const addLegalEntity = createAsyncThunk<
    void,
    CreateLegalEntityFormData,
    ThunkConfig<string>
>(
  'createLegalEntity/addLegalEntity',
  async (formData, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.post<CreateLegalEntityFormData>('/api/v1/entities/create/', formData);
      if (!response.data) {
        throw new Error('Ошибка создания группы услуг');
      }
      dispatch(createLegalEntityActions.closeModal());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
