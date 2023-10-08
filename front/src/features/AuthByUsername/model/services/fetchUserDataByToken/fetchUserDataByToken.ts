import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { User, UserAuthData } from "entities/User";
import { RoutePath } from "shared/config/RouteConfig/appRouteConfig";
import { USER_LOCALSTORAGE_TOKENS } from "shared/const/localStorage";
import { refreshToken } from "../refreshToken/refreshToken";




export const fetchUserDataByToken = createAsyncThunk<
    UserAuthData, 
    string, 
    ThunkConfig<string>
>(
    'login/fetchUserDataByToken',
    async (accessToken, { extra, rejectWithValue, dispatch }) => {
        
        const tokens = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_TOKENS) || '')
        console.log('fetch user')
        try{

            const userResponse = await extra.api.get<User>('http://localhost:8000/api/v1/users/me/', {
                headers: {
                    Authorization: `Bearer ${tokens.access}`
                }
            })            

            if(!userResponse.data){
                throw new Error('Ошибка авторизации пользователя')
            }
            extra.navigate?.(RoutePath.appointments)

            return userResponse.data
            
        }catch (e: any){

            if(e.response.status === 403){
                dispatch(refreshToken(tokens?.refresh))
            }
            return rejectWithValue(e.response.message)
        }
    }
)