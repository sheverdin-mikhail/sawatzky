import { StateSchema } from 'app/providers';

export const getCreateEmployeeFormWorkObjectGroup = (state: StateSchema) => state.createEmployee?.formData.workObjectGroup;
export const getCreateEmployeeFormWorkObject = (state: StateSchema) => state.createEmployee?.formData.workObject;
export const getCreateEmployeeFormWorkingObjects = (state: StateSchema) => state.createEmployee?.formData.workingObjects;
export const getCreateEmployeeFormFio = (state: StateSchema) => state.createEmployee?.formData.fio;
export const getCreateEmployeeFormRole = (state: StateSchema) => state.createEmployee?.formData.role;
export const getCreateEmployeeFormStatus = (state: StateSchema) => state.createEmployee?.formData.status;
export const getCreateEmployeeError = (state: StateSchema) => state.createEmployee?.error;
export const getCreateEmployeeIsLoading = (state: StateSchema) => state.createEmployee?.isLoading;
export const getCreateEmployeeIsOpen = (state: StateSchema) => state.createEmployee?.isOpen;
