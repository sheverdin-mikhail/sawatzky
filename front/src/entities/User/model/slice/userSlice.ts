import { createSlice } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_DATA, USER_LOCALSTORAGE_TOKENS } from 'shared/const/localStorage';
import { UserSchema } from '../types/user';
import { refreshToken } from '../services/refreshToken/refreshToken';

const initialState: UserSchema = {
    _inited: false,
    isLoading: false,
    error: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            state.data = action.payload
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_DATA)
            if (user) {
                state.data = JSON.parse(user)
            }
            state._inited = true
        },
        logout: (state) => {
            state.data = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_DATA)
            localStorage.removeItem(USER_LOCALSTORAGE_TOKENS)
        }
    },
    extraReducers: builder => builder
        //Рефреш токена
        .addCase(refreshToken.pending, (state, action) => {
            state.error = undefined
            state.isLoading = true

        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.isLoading = false
            const jsonTokens = localStorage.getItem(USER_LOCALSTORAGE_TOKENS)
            if (jsonTokens) {
                const tokens = JSON.parse(jsonTokens)
                localStorage.setItem(USER_LOCALSTORAGE_TOKENS, JSON.stringify({
                    access: action.payload,
                    refresh: tokens.refresh
                }))
            }
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
