import { createSlice } from '@reduxjs/toolkit'
import { UserSchema } from '../types/user'
import { USER_LOCALSTORAGE_DATA, USER_LOCALSTORAGE_TOKENS } from 'shared/const/localStorage'

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
        if(user){
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
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
