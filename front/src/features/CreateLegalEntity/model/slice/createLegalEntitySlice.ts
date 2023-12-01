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
    setWorkObjectsGroup: (state, action: PayloadAction<number>) => {
      state.formData.workObjectsGroup = action.payload;
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
    setHead: (state, action: PayloadAction<string>) => {
      state.formData.head = action.payload;
    },
    setLegalAddress: (state, action: PayloadAction<string>) => {
      state.formData.legalAddress = action.payload;
    },
    setMail: (state, action: PayloadAction<string>) => {
      state.formData.mail = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.formData.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.formData.phone = action.payload;
    },
    setPrepayment: (state, action: PayloadAction<boolean>) => {
      state.formData.prepayment = action.payload;
    },
    setSawatzky: (state, action: PayloadAction<boolean>) => {
      state.formData.sawatzky = action.payload;
    },
    setSettlementAccount: (state, action: PayloadAction<string>) => {
      state.formData.settlementAccount = action.payload;
    },
    setWorkMaterialGroups: (state, action: PayloadAction<number[]>) => {
      state.formData.workMaterialGroups = action.payload;
    },
    setWorkTaskGroups: (state, action: PayloadAction<number[]>) => {
      state.formData.workTaskGroups = action.payload;
    },
  },
});

export const { actions: createLegalEntityActions } = createLegalEntitySlice;
export const { reducer: createLegalEntityReducer } = createLegalEntitySlice;
