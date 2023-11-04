import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddWorkTaskGroupFormSchema, addWorkTaskGroupFormData } from '../type/addWorkTaskGroup';
import { createWorkTaskGroup } from '../services/createWorkTaskGroup';

const initialState: AddWorkTaskGroupFormSchema = {
    isOpen: false,
<<<<<<< HEAD
    isLoading: false,
};
=======
    isLoading: false
} 

>>>>>>> main

export const addWorkTaskGroupFormSlice = createSlice({
    name: 'addWorkTaskGroupForm',
    initialState,
    reducers: {
<<<<<<< HEAD

        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setFormData: (state, action: PayloadAction<addWorkTaskGroupFormData>) => {
            state.formData = action.payload;
        },

    },
    extraReducers: (builder) => builder
    // Получение списка групп услуг
        .addCase(createWorkTaskGroup.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        })
        .addCase(createWorkTaskGroup.fulfilled, (state) => {
            state.isLoading = false;
            state.formData = undefined;
            state.isOpen = false;
        })
        .addCase(createWorkTaskGroup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
});

export const { actions: addWorkTaskGroupFormActions } = addWorkTaskGroupFormSlice;
export const { reducer: addWorkTaskGroupFormReducer } = addWorkTaskGroupFormSlice;
=======

        openModal: (state) => {
            state.isOpen = true
        },
        closeModal: (state) => {
            state.isOpen = false
        },
        setFormData: (state, action: PayloadAction<addWorkTaskGroupFormData>) => {
            state.formData = action.payload
        }
    
    },
    extraReducers: (builder) => builder 
    //Получение списка групп услуг
        .addCase(createWorkTaskGroup.pending, (state, action)=>{
            state.error = undefined
            state.isLoading = true
        })
        .addCase(createWorkTaskGroup.fulfilled, (state)=>{
            state.isLoading = false
            state.formData = undefined
            state.isOpen = false

        })
        .addCase(createWorkTaskGroup.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
})

export const { actions: addWorkTaskGroupFormActions } = addWorkTaskGroupFormSlice
export const { reducer: addWorkTaskGroupFormReducer } = addWorkTaskGroupFormSlice
>>>>>>> main
