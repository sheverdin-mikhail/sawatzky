import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddWorkTaskApplicationFormSchema, ApplicationWorkTaskForPatch, FormStep } from '../type/addWorkTaskApplicationForm'
import { WorkTask } from 'entities/WorkTask'

const initialState: AddWorkTaskApplicationFormSchema = {
    isOpen: false,
    isLoading: false,
    formStep: FormStep.CHOSE,
    formData: {},
    _init: false
} 

interface initialData {
  id: string;
  prevWorkTasks: ApplicationWorkTaskForPatch[];
}


export const addWorkTaskApplicationFormSlice = createSlice({
    name: 'addWorkTaskApplicationForm',
    initialState,
    reducers: {

        initForm: (state, action: PayloadAction<initialData>) => {
            state.formData.applicationId = action.payload.id
            state.formData.prevWorkTasks = action.payload.prevWorkTasks
            state._init = true
        },

        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
            state.selectedItem = undefined
            state.actualTimeText = ''
            state.formStep = FormStep.CHOSE
        },
        setActualStep: (state) => {
            state.formStep = FormStep.ACTUAL
        },
        setChoseStep: (state) => {
            state.formStep = FormStep.CHOSE
        },
        selectItem: (state, action: PayloadAction<WorkTask>) => {
            state.selectedItem = action.payload
        },
        setActualTimeText: (state, action: PayloadAction<string>) => {
            state.actualTimeText = action.payload
        }
    },
    extraReducers: (builder) => builder 

})

export const { actions: addWorkTaskApplicationFormActions } = addWorkTaskApplicationFormSlice
export const { reducer: addWorkTaskApplicationFormReducer } = addWorkTaskApplicationFormSlice
