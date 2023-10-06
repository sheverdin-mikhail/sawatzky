import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/LoginSchema'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'

// Define the initial state using that type
const initialState: LoginSchema = {
    isLoading: false,
    username: '',
    password: ''
    
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
  },
  extraReducers:  (builder) => {
    builder
        .addCase(loginByUsername.pending, (state, action)=>{
            state.error = undefined
            state.isLoading = true
        })
        .addCase(loginByUsername.fulfilled, (state, action)=>{
            state.isLoading = false
        })
        .addCase(loginByUsername.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
  }
  
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
