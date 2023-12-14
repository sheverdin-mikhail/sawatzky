import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { deleteUser, userActions } from 'entities/User';
import { fetchEmployeeList } from './fetchEmployeeList';

export const deleteEmployee = createAsyncThunk<
    void,
    number | string,
    ThunkConfig<string>
>(
  'employee/deleteEmployee',
  async (userId, { extra, rejectWithValue, dispatch }) => {
    try {
      dispatch(deleteUser(userId))
        .then(() => dispatch(fetchEmployeeList()))
        .catch(() => {
          throw new Error('Ошибка удаления представителя заказчика');
        });
    } catch (e: any) {
      if (e.response.status === 401) {
        dispatch(userActions.logout());
      }
      return rejectWithValue(e.response.message);
    }
  },
);
