import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddWorkMaterialFormSchema } from '../type/addWorkMaterial'
import { createWorkMaterial } from '../services/createWorkMaterial'

const initialState: AddWorkMaterialFormSchema = {
  isOpen: false,
  isLoading: false
} 


export const addWorkMaterialFormSlice = createSlice({
  name: 'addWorkMaterialForm',
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
    .addCase(createWorkMaterial.pending, (state, action)=>{
      state.error = undefined
      state.isLoading = true
    })
    .addCase(createWorkMaterial.fulfilled, (state)=>{
        state.isLoading = false
        state.formData = undefined
        state.isOpen = false

    })
    .addCase(createWorkMaterial.rejected, (state, action)=>{
        state.isLoading = false
        state.error = action.payload
    })
})

export const { actions: addWorkMaterialFormActions } = addWorkMaterialFormSlice
export const { reducer: addWorkMaterialFormReducer } = addWorkMaterialFormSlice
