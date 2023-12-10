import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { User } from '../types/user';

export const deleteUser = createAsyncThunk<
  void,
  number | string,
  ThunkConfig<string>
>(
  'user/deleteUser',
  async (userId, { extra, rejectWithValue, dispatch }) => {
    try {
      const response = await extra.api.delete<User>(`/api/v1/work_objects/${userId}`);
      if (response.status !== 204) {
        throw new Error('Ошибка удаления пользователя');
      }
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
