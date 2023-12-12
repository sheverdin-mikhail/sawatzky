import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { deleteLegalEntity } from './deleteLegalEntity';
import { fetchLegalEntityList } from './fetchLegalEntityList';

export const deleteLegalEntitySawatzky = createAsyncThunk<
  void,
  number | string,
  ThunkConfig<string>
>(
  'legalEntity/deleteLegalEntitySawatzky',
  async (userId, { extra, rejectWithValue, dispatch }) => {
    try {
      dispatch(deleteLegalEntity(userId))
        .then(() => dispatch(fetchLegalEntityList(true)))
        .catch(() => {
          throw new Error('Ошибка удаления юр. лица');
        });
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
