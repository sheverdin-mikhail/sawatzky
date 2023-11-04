import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddWorkMaterialGroupFormSchema, AddWorkMaterialGroupFormData } from '../type/addWorkMaterialGroup';
import { createWorkMaterialGroup } from '../services/createWorkMaterialGroup';

const initialState: AddWorkMaterialGroupFormSchema = {
    isOpen: false,
    isLoading: false,
};

export const addWorkMaterialGroupFormSlice = createSlice({
    name: 'addWorkMaterialGroupForm',
    initialState,
    reducers: {

        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setFormData: (state, action: PayloadAction<AddWorkMaterialGroupFormData>) => {
            state.formData = action.payload;
        },

    },
    extraReducers: (builder) => builder
    // Получение списка групп услуг
        .addCase(createWorkMaterialGroup.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        })
        .addCase(createWorkMaterialGroup.fulfilled, (state) => {
            state.isLoading = false;
            state.formData = undefined;
            state.isOpen = false;
        })
        .addCase(createWorkMaterialGroup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
});

export const { actions: addWorkMaterialGroupFormActions } = addWorkMaterialGroupFormSlice;
export const { reducer: addWorkMaterialGroupFormReducer } = addWorkMaterialGroupFormSlice;
