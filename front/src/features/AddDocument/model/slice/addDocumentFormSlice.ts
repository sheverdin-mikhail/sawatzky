import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddDocumentFormSchema } from '../type/addDocument';

const initialState: AddDocumentFormSchema = {
  isOpen: false,
  isLoading: false,
};

export const addDocumentFormSlice = createSlice({
  name: 'addDocumentForm',
  initialState,
  reducers: {

    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formData = {};
    },

  },
  extraReducers: (builder) => builder,
  // Создание услуги
  // .addCase(createWorkTask.pending, (state, action) => {
  //   state.error = undefined;
  //   state.isLoading = true;
  // })
  // .addCase(createWorkTask.fulfilled, (state) => {
  //   state.isLoading = false;
  //   state.formData = undefined;
  //   state.isOpen = false;
  // })
  // .addCase(createWorkTask.rejected, (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // }),
});

export const { actions: addDocumentFormActions } = addDocumentFormSlice;
export const { reducer: addDocumentFormReducer } = addDocumentFormSlice;
