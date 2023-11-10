import { StateSchema } from 'app/providers';

export const getWorkObjectGroupFormName = (state: StateSchema) => state.addWorkObjectGroupForm?.formData?.name;
export const getWorkObjectGroupFormIsOpen = (state: StateSchema) => state.addWorkObjectGroupForm?.isOpen;
export const getWorkObjectGroupFormIsLoading = (state: StateSchema) => state.addWorkObjectGroupForm?.isOpen;
export const getWorkObjectGroupFormError = (state: StateSchema) => state.addWorkObjectGroupForm?.error;
