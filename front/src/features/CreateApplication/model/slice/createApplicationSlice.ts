import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CreateApplicationSchema } from '../type/createApplication'
import { saveApplication } from '../serivces/saveApplication/saveApplication'


const initialState: CreateApplicationSchema = {
    isLoading: false,
    isOpen: false,
    data: undefined,
    form: {},
    error: undefined
}



export const createApplicationSlice = createSlice({
    name: 'createApplication',
    initialState,
    reducers: {
        openModal: (state)=>{
            state.isOpen = true
        },
        closeModal: (state)=>{
            state.isOpen = false
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.form.title = action.payload 
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.form.description = action.payload 
        },
        setStartWorkDate: (state, action: PayloadAction<string>) => {
            state.form.startWorkDate = action.payload 
        },
        setEndWorkDate: (state, action: PayloadAction<string>) => {
            state.form.endWorkDate = action.payload
        },
        clearWorkDates: (state) => {
            state.form.startWorkDate = ''
            state.form.endWorkDate = ''
        },
        clearForm: (state) => {
            state.form = {}
        },
    },
    extraReducers: (builder) => builder
    //Аунтификация пользователя
        .addCase(saveApplication.pending, (state, action)=>{
            state.error = undefined
            state.isLoading = true
        })
        .addCase(saveApplication.fulfilled, (state, action)=>{
            state.isLoading = false
            state.form = {}
        })
        .addCase(saveApplication.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
})

export const { actions: createApplicationActions } = createApplicationSlice
export const { reducer: createApplicationReducer } = createApplicationSlice
