import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { User } from "entities/User";
import { TokensData, UserAuthData } from "entities/User/model/types/user";
import { RoutePath } from "shared/config/RouteConfig/appRouteConfig";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    UserAuthData, 
    LoginByUsernameProps, 
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, { extra, rejectWithValue }) => {
        try{
            const tokensResponse = await extra.api.post<TokensData>('http://localhost:8000/api/auth/jwt/create/', authData)
            if(!tokensResponse.data){
                throw new Error('Ошибка авторизации пользователя')
            }
            const userResponse = await extra.api.get<User>('http://localhost:8000/api/v1/users/me/', {
                headers: {
                    Authorization: `Bearer ${tokensResponse.data.access}`
                }
            })            
            if(!userResponse.data){
                throw new Error('Ошибка авторизации пользователя')
            }
            extra.navigate?.(RoutePath.appointments)

            return {...userResponse.data, ...tokensResponse.data}
        }catch (e: any){
            if(e.response.status === 401){
                return rejectWithValue('Неверно введено имя пользователя или пароль')
            }else{
                return rejectWithValue('Ошибка авторизации пользвателя')
            }
        }
    }
)