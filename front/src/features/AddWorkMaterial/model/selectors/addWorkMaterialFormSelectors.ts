import { StateSchema } from "app/providers";


export const getAddWorkMaterialFormIsOpen = (state: StateSchema) => state.addWorkMaterialForm?.isOpen
export const getAddWorkMaterialName = (state: StateSchema) => state.addWorkMaterialForm?.formData?.name
export const getAddWorkMaterialPrice = (state: StateSchema) => state.addWorkMaterialForm?.formData?.price
export const getAddWorkMaterialTime = (state: StateSchema) => state.addWorkMaterialForm?.formData?.time
export const getAddWorkMaterialStatus = (state: StateSchema) => state.addWorkMaterialForm?.formData?.status

