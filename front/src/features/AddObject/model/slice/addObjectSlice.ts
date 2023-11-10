import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createWorkObject } from '../services/services/createObject';
import { AddWorkObjectFormSchema } from '../type/addObject';

const initialState: AddWorkObjectFormSchema = {
  isOpen: false,
  isLoading: false,
  formData: {},
};

export const addWorkObjectFormSlice = createSlice({
  name: 'addWorkObjectForm',
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
    setCode: (state, action: PayloadAction<string>) => {
      state.formData = { ...state.formData, code: action.payload };
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.formData = { ...state.formData, address: action.payload };
    },
    setContractNumber: (state, action: PayloadAction<string>) => {
      state.formData = { ...state.formData, contractNumber: action.payload };
    },
    initForm: (state, action: PayloadAction<number>) => {
      state.groupId = action.payload;
    },

  },
  extraReducers: (builder) => builder
    // Создание услуги
    .addCase(createWorkObject.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(createWorkObject.fulfilled, (state) => {
      state.isLoading = false;
      state.formData = {};
      state.isOpen = false;
    })
    .addCase(createWorkObject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: addWorkObjectFormActions } = addWorkObjectFormSlice;
export const { reducer: addWorkObjectFormReducer } = addWorkObjectFormSlice;
