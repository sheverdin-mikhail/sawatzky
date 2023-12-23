import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddReportSchema } from '../type/addReport';

const initialState: AddReportSchema = {
  isOpen: false,
  isLoading: false,
  formData: {},
};

export const addReportSlice = createSlice({
  name: 'addReport',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formData = {};
    },
    setWorkObjectsGroup: (state, action: PayloadAction<number>) => {
      state.formData.workObjectsGroup = action.payload;
      state.formData.workObject = undefined;
    },
    setWorkObject: (state, action: PayloadAction<number>) => {
      state.formData.workObject = action.payload;
    },
    setLegalEntity: (state, action: PayloadAction<number>) => {
      state.formData.legalEntity = action.payload;
    },
    setEmployee: (state, action: PayloadAction<number>) => {
      state.formData.employee = action.payload;
    },
  },
});

export const { actions: addReportActions } = addReportSlice;
export const { reducer: addReportReducer } = addReportSlice;
