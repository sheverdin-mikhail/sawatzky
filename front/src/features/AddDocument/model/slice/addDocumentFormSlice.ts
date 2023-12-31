import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddDocumentFormSchema, DocType } from '../type/addDocument';

const initialState: AddDocumentFormSchema = {
  isOpen: false,
  isLoading: false,
  formData: {},
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
    setFileName: (state, action: PayloadAction<string>) => {
      state.formData.name = action.payload;
    },
    setDocType: (state, action: PayloadAction<DocType>) => {
      state.formData.docType = action.payload;
    },

  },
});

export const { actions: addDocumentFormActions } = addDocumentFormSlice;
export const { reducer: addDocumentFormReducer } = addDocumentFormSlice;
