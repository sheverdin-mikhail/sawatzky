import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { deleteUser, userActions } from 'entities/User';
import { fetchSawatzkyEmployeeList } from './fetchSawatzkyEmployeeList';

export const deleteSawatzkyEmployee = createAsyncThunk<
  void,
  number | string,
  ThunkConfig<string>
>(
  'sawatzkyEmployee/deleteSawatzkyEmployee',
  async (userId, { extra, rejectWithValue, dispatch }) => {
    try {
      dispatch(deleteUser(userId))
        .then(() => dispatch(fetchSawatzkyEmployeeList()))
        .catch(() => {
          throw new Error('Ошибка удаления сотрудника Sawatzky');
        });
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
