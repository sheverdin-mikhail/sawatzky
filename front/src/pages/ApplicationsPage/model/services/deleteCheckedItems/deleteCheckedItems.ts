import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { fetchApplicationsList } from '../fetchApplicationsList/fetchApplicationsList';

export const deleteCheckedItems = createAsyncThunk<
    void,
    string[],
    ThunkConfig<string>
>(
  'applicationsPage/deleteCheckedItems',
  async (listId, { extra, rejectWithValue, dispatch }) => {
    try {
      if (listId.length > 0) {
        await Promise.all(listId.map(async (id) => {
          const response = await extra.api.delete(`/api/v1/applications/${id}`);
          if (response.status !== 204) {
            throw new Error('Ошибка удаления запроса!');
          }
        }));
      } else {
        throw new Error('Ни один запрос не выбран!');
      }
      dispatch(fetchApplicationsList());
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e);
    }
  },
);
