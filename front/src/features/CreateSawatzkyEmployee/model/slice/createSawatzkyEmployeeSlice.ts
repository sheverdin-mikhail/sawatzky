import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CreateSawatzkyEmployeeSchema } from '../type/createSawatzkyEmployee';

const initialState: CreateSawatzkyEmployeeSchema = {
  isOpen: false,
  isLoading: false,
  formData: {
    user: {},
  },
};

export const createSawatzkyEmployeeSlice = createSlice({
  name: 'createSawatzkyEmployee',
  initialState,
  reducers: {

    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formData = {
        user: {},
      };
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
      state.formData.user.fio = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.formData.user.phoneNumber = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.formData.user.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.formData.user.password = action.payload;
    },
    setPosition: (state, action: PayloadAction<string>) => {
      state.formData.position = action.payload;
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
  // extraReducers: (builder) => builder
  // Получение списка групп услуг
  // .addCase(createWorkTaskGroup.pending, (state, action) => {
  //   state.error = undefined;
  //   state.isLoading = true;
  // })
  // .addCase(createWorkTaskGroup.fulfilled, (state) => {
  //   state.isLoading = false;
  //   state.formData = {
  //     user: {},
  //   };
  //   state.isOpen = false;
  // })
  // .addCase(createWorkTaskGroup.rejected, (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  // }),
});

export const { actions: createSawatzkyEmployeeActions } = createSawatzkyEmployeeSlice;
export const { reducer: createSawatzkyEmployeeReducer } = createSawatzkyEmployeeSlice;
