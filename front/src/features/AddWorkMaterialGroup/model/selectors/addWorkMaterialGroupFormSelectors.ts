import { StateSchema } from "app/providers";


export const getAddWorkMaterialGroupFormIsOpen = (state: StateSchema) => state.addWorkMaterialGroupForm?.isOpen
export const getAddWorkMaterialGroupFormData = (state: StateSchema) => state.addWorkMaterialGroupForm?.formData
