import { createSlice } from '@reduxjs/toolkit'
import { AddWorkTaskApplicationFormSchema } from '../type/addWorkTaskApplicationForm'

const initialState: AddWorkTaskApplicationFormSchema = {
  isOpen: false,
  isLoading: false
} 


export const addWorkTaskApplicationFormSlice = createSlice({
  name: 'addWorkTaskApplicationForm',
  initialState,
  reducers: {

    openModal: (state) => {
      state.isOpen = true
    },
    closeModal: (state) => {
      state.isOpen = false
    },

    
  },
  extraReducers: (builder) => builder 

})

export const { actions: addWorkTaskApplicationFormActions } = addWorkTaskApplicationFormSlice
export const { reducer: addWorkTaskApplicationFormReducer } = addWorkTaskApplicationFormSlice
