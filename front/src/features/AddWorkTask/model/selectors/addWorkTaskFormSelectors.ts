import { StateSchema } from 'app/providers';

export const getAddWorkTaskFormIsOpen = (state: StateSchema) => state.addWorkTaskForm?.isOpen;
export const getAddWorkTaskName = (state: StateSchema) => state.addWorkTaskForm?.formData?.name;
export const getAddWorkTaskPrice = (state: StateSchema) => state.addWorkTaskForm?.formData?.price;
export const getAddWorkTaskTime = (state: StateSchema) => state.addWorkTaskForm?.formData?.time;
export const getAddWorkTaskStatus = (state: StateSchema) => state.addWorkTaskForm?.formData?.status;
