import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { User, userActions } from "entities/User";
import { USER_LOCALSTORAGE_TOKENS } from "shared/const/localStorage";
import { refreshToken } from "../refreshToken/refreshToken";




export const fetchUserDataByToken = createAsyncThunk<
    User, 
    void, 
    ThunkConfig<string>
>(
    'login/fetchUserDataByToken',
    async (_, { extra, rejectWithValue, dispatch }) => {
        
        const tokens = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_TOKENS) || '')
        try{

            const userResponse = await extra.api.get<User>('http://localhost:8000/api/v1/users/me/', {
                headers: {
                    Authorization: `Bearer ${tokens.access}`
                }
            })            

            if(!userResponse.data){
                throw new Error('Ошибка авторизации пользователя')
            }
            
            dispatch(userActions.setAuthData(userResponse.data))
            return userResponse.data
            
        }catch (e: any){

            if(e.response.status === 403){
                dispatch(refreshToken(tokens?.refresh))
            }
            return rejectWithValue('error')
        }
    }
)