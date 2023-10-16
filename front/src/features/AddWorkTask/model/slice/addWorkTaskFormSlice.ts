import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddWorkTaskFormSchema, AddWorkTaskFormData } from '../type/addWorkTask'
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
    setFormData: (state, action: PayloadAction<AddWorkTaskFormData>) => {
      state.formData = action.payload
    }
    
  },
  extraReducers: (builder) => builder 
  //Получение списка групп услуг
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
