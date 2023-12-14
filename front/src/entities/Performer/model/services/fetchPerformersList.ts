import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { userActions } from 'entities/User';
import { SawatzkyEmployee } from 'entities/SawatzkyEmployee';
import { EmployeeRole } from 'entities/Employee';

export const fetchPerformersList = createAsyncThunk<
    SawatzkyEmployee[],
    void,
    ThunkConfig<string>
>(
  'performer/fetchPerformersList',
  async (_, { extra, rejectWithValue, dispatch }) => {
    const params = {
      role: EmployeeRole.PERFORMER,
    };
    try {
      const response = await extra.api.get<SawatzkyEmployee[]>('/api/v1/sawatzky_employee/', { params });
      if (!response.data) {
        throw new Error('Ошибка получения списка исполнителей');
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
