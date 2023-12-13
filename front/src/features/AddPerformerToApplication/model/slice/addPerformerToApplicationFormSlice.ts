import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddPerformerToApplicationFormSchema } from '../type/addPerformerToApplication';
import { addPerformerToApplication } from '../services/addPerformerToApplication';

const initialState: AddPerformerToApplicationFormSchema = {
  formData: {
    data: {},
  },
  isOpen: false,
  isLoading: false,
};
const addPerformerToApplicationFormSlice = createSlice({
  name: 'addWorkTaskForm',
  initialState,
  reducers: {

    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.formData.data = {};
    },
    setPerformer: (state, action: PayloadAction<string | number>) => {
      state.formData.data.performer = +action.payload;
    },
    setPriority: (state, action: PayloadAction<string>) => {
      state.formData.data.priority = action.payload;
    },
  },
  extraReducers: (builder) => builder
    // Создание услуги
    .addCase(addPerformerToApplication.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(addPerformerToApplication.fulfilled, (state) => {
      state.isLoading = false;
      state.formData = {
        data: {},
      };
      state.isOpen = false;
    })
    .addCase(addPerformerToApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: addPerformerToApplicationFormActions } = addPerformerToApplicationFormSlice;
export const { reducer: addPerformerToApplicationFormReducer } = addPerformerToApplicationFormSlice;
