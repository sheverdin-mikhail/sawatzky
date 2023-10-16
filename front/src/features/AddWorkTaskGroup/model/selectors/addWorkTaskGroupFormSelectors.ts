import { StateSchema } from "app/providers";


export const getAddWorkTaskGroupFormIsOpen = (state: StateSchema) => state.addWorkTaskGroupForm?.isOpen
export const getAddWorkTaskGroupFormData = (state: StateSchema) => state.addWorkTaskGroupForm?.formData