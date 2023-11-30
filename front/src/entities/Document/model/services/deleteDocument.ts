import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';

export const deleteDocument = createAsyncThunk<
    void,
    number | string,
    ThunkConfig<string>
>(
  'document/deleteDocument',
  async (docId, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.delete<Document>(`/api/v1/documents/${docId}`);
      if (response.status !== 204) {
        throw new Error('Ошибка удаления группы услуг');
      }
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
