import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddWorkTaskFormSchema } from '../type/addWorkTask'
import { createWorkTask } from '../services/createWorkTask'

const initialState: AddWorkTaskFormSchema = {
  isOpen: false,
  isLoading: false
} 


export const addWorkTaskFormSlice = createSlice({
  name: 'addWorkTaskForm',
  initialState,
  reducers: {

    openModal: (state) => {
      state.isOpen = true
    },
    closeModal: (state) => {
      state.isOpen = false
    },
    setName: (state, action: PayloadAction<string>) => {
      state.formData = {...state.formData, name: action.payload}
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.formData = {...state.formData, price: action.payload}
    },
    setTime: (state, action: PayloadAction<string>) => {
      state.formData = {...state.formData, time: action.payload}
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.formData = {...state.formData, status: action.payload}
    }
    
  },
  extraReducers: (builder) => builder 
  // Создание услуги
    .addCase(createWorkTask.pending, (state, action)=>{
      state.error = undefined
      state.isLoading = true
    })
    .addCase(createWorkTask.fulfilled, (state)=>{
        state.isLoading = false
        state.formData = undefined
        state.isOpen = false

    })
    .addCase(createWorkTask.rejected, (state, action)=>{
        state.isLoading = false
        state.error = action.payload
    })
})

export const { actions: addWorkTaskFormActions } = addWorkTaskFormSlice
export const { reducer: addWorkTaskFormReducer } = addWorkTaskFormSlice
