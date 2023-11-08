import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_DATA, USER_LOCALSTORAGE_TOKENS } from 'shared/const/localStorage';
import { LoginSchema } from '../types/LoginSchema';
import { createTokensByUsername } from '../services/createTokensByUsername/createTokensByUsername';
import { fetchUserDataByToken } from '../services/fetchUserDataByToken/fetchUserDataByToken';

// Define the initial state using that type
const initialState: LoginSchema = {
    isLoading: false,
    username: '',
    password: '',

};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        // Аунтификация пользователя
            .addCase(createTokensByUsername.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createTokensByUsername.fulfilled, (state, action) => {
                state.isLoading = false;
                localStorage.setItem(USER_LOCALSTORAGE_TOKENS, JSON.stringify(action.payload));
            })
            .addCase(createTokensByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        // Получение информации о пользователе
            .addCase(fetchUserDataByToken.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUserDataByToken.fulfilled, (state, action) => {
                state.isLoading = false;
                localStorage.setItem(USER_LOCALSTORAGE_DATA, JSON.stringify(action.payload));
            })
            .addCase(fetchUserDataByToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },

});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
