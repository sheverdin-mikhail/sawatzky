import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { TokensData } from "../../types/LoginSchema";
import { userActions } from "entities/User";


export const refreshToken = createAsyncThunk<
    string, 
    string, 
    ThunkConfig<string>
>(
    'login/refreshToken',
    async (refreshToken, { extra, rejectWithValue, dispatch }) => {
        try{
            const tokensResponse = await extra.api.post<TokensData>('/api/auth/jwt/create/', {refresh: refreshToken})

            if(!tokensResponse.data){
                throw new Error('Ошибка авторизации пользователя')
            }

            return tokensResponse.data.access
        }catch (e: any){
            if(e.response.status === 401){
                dispatch(userActions.logout())
                return rejectWithValue('Неверный или устаревший токен')
            }
            return rejectWithValue('Ошибка обновления токена')
        }
    }
)