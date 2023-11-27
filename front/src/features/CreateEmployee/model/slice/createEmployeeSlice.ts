import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createWorkTaskGroup } from '../services/createEmployee';
import { CreateEmployeeSchema } from '../type/createEmployee';

const initialState: CreateEmployeeSchema = {
  isOpen: false,
  isLoading: false,
  formData: {},
};

export const createEmployeeSlice = createSlice({
  name: 'createEmployee',
  initialState,
  reducers: {

    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formData = {};
    },
    setWorkObjectGroup: (state, action: PayloadAction<number>) => {
      state.formData.workObjectGroup = action.payload;
      state.formData.workObject = undefined;
      state.formData.workingObjects = undefined;
    },
    setWorkObject: (state, action: PayloadAction<number>) => {
      state.formData.workObject = action.payload;
      state.formData.workingObjects = undefined;
    },
    setFio: (state, action: PayloadAction<string>) => {
      state.formData.fio = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.formData.role = action.payload;
    },
    setWorkingObjects: (state, action: PayloadAction<number[]>) => {
      state.formData.workingObjects = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.formData.status = action.payload;
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
      state.formData = {};
      state.isOpen = false;
    })
    .addCase(createWorkTaskGroup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: createEmployeeActions } = createEmployeeSlice;
export const { reducer: createEmployeeReducer } = createEmployeeSlice;
