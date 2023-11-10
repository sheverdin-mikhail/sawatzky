import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createWorkObjectGroup } from '../services/services/createWorkObjectGroup';
import { AddWorkObjectGroupFormSchema } from '../type/addWorkObjectGroup';

const initialState: AddWorkObjectGroupFormSchema = {
  isOpen: false,
  isLoading: false,
  formData: {},
};

export const addWorkObjectGroupFormSlice = createSlice({
  name: 'addWorkObjectGroupForm',
  initialState,
  reducers: {

    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formData = {};
    },
    setName: (state, action: PayloadAction<string>) => {
      state.formData = { ...state.formData, name: action.payload };
    },

  },
  extraReducers: (builder) => builder
    // Создание услуги
    .addCase(createWorkObjectGroup.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(createWorkObjectGroup.fulfilled, (state) => {
      state.isLoading = false;
      state.formData = {};
      state.isOpen = false;
    })
    .addCase(createWorkObjectGroup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: addWorkObjectGroupFormActions } = addWorkObjectGroupFormSlice;
export const { reducer: addWorkObjectGroupFormReducer } = addWorkObjectGroupFormSlice;
