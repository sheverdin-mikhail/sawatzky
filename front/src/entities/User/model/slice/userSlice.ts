import { createSlice } from '@reduxjs/toolkit'
import { UserSchema } from '../types/user'
import { USER_LOCALSTORAGE_DATA } from 'shared/const/localStorage'

const initialState: UserSchema = {
  _inited: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setAuthData: (state, action) => {
        state.authData = action.payload
      },
      initAuthData: (state) => {
        const user = localStorage.getItem(USER_LOCALSTORAGE_DATA)
        if(user){
          state.authData = JSON.parse(user)
        }
        state._inited = true
      },
      logout: (state) => {
        state.authData = undefined
        localStorage.removeItem(USER_LOCALSTORAGE_DATA)
      }
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
