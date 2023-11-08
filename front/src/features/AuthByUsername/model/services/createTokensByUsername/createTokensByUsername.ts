import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers';
import { TokensData } from '../../types/LoginSchema';

interface createTokensByUsernameProps {
    username: string;
    password: string;
}

export const createTokensByUsername = createAsyncThunk<
    TokensData,
    createTokensByUsernameProps,
    ThunkConfig<string>
>(
  'login/createTokensByUsername',
  async (authData, { extra, rejectWithValue }) => {
    try {
      const tokensResponse = await extra.api.post<TokensData>('/api/auth/jwt/create/', authData);
      if (!tokensResponse.data) {
        throw new Error('Ошибка авторизации пользователя');
      }
      return tokensResponse.data;
    } catch (e: any) {
      if (e.response.status === 401) {
        return rejectWithValue('Неверно введено имя пользователя или пароль');
      }
      return rejectWithValue('Ошибка авторизации пользвателя');
    }
  },
);
