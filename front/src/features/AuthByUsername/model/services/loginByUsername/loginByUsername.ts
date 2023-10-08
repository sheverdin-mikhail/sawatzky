import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers";
import { fetchUserDataByToken } from "../fetchUserDataByToken/fetchUserDataByToken";
import { createTokensByUsername } from "../createTokensByUsername/createTokensByUsername";

interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    void, 
    loginByUsernameProps, 
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (authData, { extra, rejectWithValue, dispatch }) => {
        try{
            dispatch(createTokensByUsername(authData))
            dispatch(fetchUserDataByToken(''))
           
        }catch (e: any){
            if(e.response.status === 401){
                return rejectWithValue('Неверно введено имя пользователя или пароль')
            }else{
                return rejectWithValue('Ошибка авторизации пользвателя')
            }
        }
    }
)