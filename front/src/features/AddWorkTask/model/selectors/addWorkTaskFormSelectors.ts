import { StateSchema } from "app/providers";


export const getAddWorkTaskFormIsOpen = (state: StateSchema) => state.addWorkTaskForm?.isOpen
export const getAddWorkTaskFormData = (state: StateSchema) => state.addWorkTaskForm?.formData