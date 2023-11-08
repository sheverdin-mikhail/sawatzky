import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WorkMaterial } from 'entities/WorkMaterial';
import {
  AddWorkMaterialApplicationFormSchema,
  ApplicationWorkMaterialForPatch,
  FormStep,
} from '../type/addWorkMaterialApplicationForm';

const initialState: AddWorkMaterialApplicationFormSchema = {
  isOpen: false,
  isLoading: false,
  formStep: FormStep.CHOSE,
  formData: {},
  _init: false,
};

interface initialData {
  id: string;
  prevWorkMaterials: ApplicationWorkMaterialForPatch[];
}

export const addWorkMaterialApplicationFormSlice = createSlice({
  name: 'addWorkMaterialApplicationForm',
  initialState,
  reducers: {

    initForm: (state, action: PayloadAction<initialData>) => {
      state.formData.applicationId = action.payload.id;
      state.formData.prevWorkMaterials = action.payload.prevWorkMaterials;
      state._init = true;
    },

    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedItem = undefined;
      state.actualCountText = '';
      state.formStep = FormStep.CHOSE;
    },
    setActualStep: (state) => {
      state.formStep = FormStep.ACTUAL;
    },
    setChoseStep: (state) => {
      state.formStep = FormStep.CHOSE;
    },
    selectItem: (state, action: PayloadAction<WorkMaterial>) => {
      state.selectedItem = action.payload;
    },
    setActualCountText: (state, action: PayloadAction<string>) => {
      state.actualCountText = action.payload;
    },
  },
  extraReducers: (builder) => builder,

});

export const { actions: addWorkMaterialApplicationFormActions } = addWorkMaterialApplicationFormSlice;
export const { reducer: addWorkMaterialApplicationFormReducer } = addWorkMaterialApplicationFormSlice;
