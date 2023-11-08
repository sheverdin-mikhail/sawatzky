import { StateSchema } from 'app/providers';

export const getAddWorkMaterialApplicationFormIsOpen = (state: StateSchema) => state.addWorkMaterialApplicationForm?.isOpen;
export const getAddWorkMaterialApplicationFormSelectedItem = (state: StateSchema) => state.addWorkMaterialApplicationForm?.selectedItem;
export const getAddWorkMaterialApplicationFormStep = (state: StateSchema) => state.addWorkMaterialApplicationForm?.formStep;
export const getAddWorkMaterialApplicationFormActualCountText = (state: StateSchema) => state.addWorkMaterialApplicationForm?.actualCountText;
export const getAddWorkMaterialApplicationFormInit = (state: StateSchema) => state.addWorkMaterialApplicationForm?._init;
export const getAddWorkMaterialApplicationFormData = (state: StateSchema) => state.addWorkMaterialApplicationForm?.formData;
