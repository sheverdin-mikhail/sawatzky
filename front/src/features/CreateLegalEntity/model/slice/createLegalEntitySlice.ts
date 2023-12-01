import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CreateLegalEntitySchema } from '../type/createLegalEntity';

const initialState: CreateLegalEntitySchema = {
  isOpen: false,
  isLoading: false,
  formData: {},
};

export const createLegalEntitySlice = createSlice({
  name: 'createLegalEntity',
  initialState,
  reducers: {

    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formData = {
      };
    },
    setWorkObjectGroup: (state, action: PayloadAction<number>) => {
      state.formData.workObjectGroup = action.payload;
      state.formData.workObject = undefined;
    },
    setWorkObject: (state, action: PayloadAction<number>) => {
      state.formData.workObject = action.payload;
    },
    setINN: (state, action: PayloadAction<string>) => {
      state.formData.INN = action.payload;
    },
    setActualAddress: (state, action: PayloadAction<string>) => {
      state.formData.actualAddress = action.payload;
    },
    setBank: (state, action: PayloadAction<string>) => {
      state.formData.bank = action.payload;
    },
    setBik: (state, action: PayloadAction<string>) => {
      state.formData.bik = action.payload;
    },
    setCorrespondentAccount: (state, action: PayloadAction<string>) => {
      state.formData.correspondentAccount = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.formData.status = action.payload;
    },

  },
});

export const { actions: createLegalEntityActions } = createLegalEntitySlice;
export const { reducer: createLegalEntityReducer } = createLegalEntitySlice;
