import { StateSchema } from 'app/providers';

export const getWorkObjectFormName = (state: StateSchema) => state.addWorkObjectForm?.formData?.name;
export const getWorkObjectFormCode = (state: StateSchema) => state.addWorkObjectForm?.formData?.code;
export const getWorkObjectFormAddress = (state: StateSchema) => state.addWorkObjectForm?.formData?.address;
export const getWorkObjectFormContractNumber = (state: StateSchema) => state.addWorkObjectForm?.formData?.contractNumber;
export const getWorkObjectFormIsOpen = (state: StateSchema) => state.addWorkObjectForm?.isOpen;
export const getWorkObjectFormIsLoading = (state: StateSchema) => state.addWorkObjectForm?.isOpen;
export const getWorkObjectFormError = (state: StateSchema) => state.addWorkObjectForm?.error;
export const getWorkObjectGroupId = (state: StateSchema) => state.addWorkObjectForm?.groupId;
