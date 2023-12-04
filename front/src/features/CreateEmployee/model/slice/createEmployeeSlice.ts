import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CreateEmployeeSchema } from '../type/createEmployee';

const initialState: CreateEmployeeSchema = {
  isOpen: false,
  isLoading: false,
  sawatzkyFormData: {
    user: {},
  },
  formData: {
    user: {},
  },
  user: {},
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
      state.error = undefined;
      state.isLoading = false;
      state.sawatzkyFormData = {
        user: {},
      };
      state.formData = {
        user: {},
      };
      state.user = {};
    },
    // Sawatzky form actions
    setWorkObjectGroup: (state, action: PayloadAction<number>) => {
      state.sawatzkyFormData.workObjectGroup = action.payload;
      state.sawatzkyFormData.workObject = undefined;
      state.sawatzkyFormData.workingObjects = undefined;
    },
    setWorkObject: (state, action: PayloadAction<number>) => {
      state.sawatzkyFormData.workObject = action.payload;
      state.sawatzkyFormData.workingObjects = undefined;
    },
    setPosition: (state, action: PayloadAction<string>) => {
      state.sawatzkyFormData.position = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.sawatzkyFormData.role = action.payload;
      state.formData.role = action.payload;
    },
    setWorkingObjects: (state, action: PayloadAction<number[]>) => {
      state.sawatzkyFormData.workingObjects = action.payload;
    },
    setStatus: (state, action: PayloadAction<boolean>) => {
      state.sawatzkyFormData.status = action.payload;
      state.formData.status = action.payload;
    },

    // form user actions
    setFio: (state, action: PayloadAction<string>) => {
      state.user.fio = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.user.phoneNumber = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.user.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },

    // employee actions
    setLegalEntity: (state, action: PayloadAction<number>) => {
      state.formData.legalEntity = action.payload;
    },
  },
});

export const { actions: createEmployeeActions } = createEmployeeSlice;
export const { reducer: createEmployeeReducer } = createEmployeeSlice;
