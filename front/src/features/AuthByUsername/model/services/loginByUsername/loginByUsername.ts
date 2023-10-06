import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "entities/User";
import axios from "axios";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue: string}>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        try{
            const response = await axios.post<User>('http://localhost:8000/login', authData)

            if(!response.data){
                throw new Error()
            }

            return response.data
        }catch (e){
            console.log(e)
            return thunkApi.rejectWithValue('error')
        }
    }
)