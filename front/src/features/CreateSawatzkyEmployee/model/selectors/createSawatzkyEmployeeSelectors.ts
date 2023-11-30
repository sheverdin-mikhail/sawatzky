import { StateSchema } from 'app/providers';

export const getCreateSawatzkyEmployeeFormWorkObjectGroup = (state: StateSchema) => state.createSawatzkyEmployee?.formData.workObjectGroup;
export const getCreateSawatzkyEmployeeFormWorkObject = (state: StateSchema) => state.createSawatzkyEmployee?.formData.workObject;
export const getCreateSawatzkyEmployeeFormWorkingObjects = (state: StateSchema) => state.createSawatzkyEmployee?.formData.workingObjects;
export const getCreateSawatzkyEmployeeFormFio = (state: StateSchema) => state.createSawatzkyEmployee?.formData.user?.fio;
export const getCreateSawatzkyEmployeeFormUsername = (state: StateSchema) => state.createSawatzkyEmployee?.formData.user?.username;
export const getCreateSawatzkyEmployeeFormPassword = (state: StateSchema) => state.createSawatzkyEmployee?.formData.user?.password;
export const getCreateSawatzkyEmployeeFormPhoneNumber = (state: StateSchema) => state.createSawatzkyEmployee?.formData.user?.phoneNumber;
export const getCreateSawatzkyEmployeeFormPosition = (state: StateSchema) => state.createSawatzkyEmployee?.formData.position;
export const getCreateSawatzkyEmployeeFormRole = (state: StateSchema) => state.createSawatzkyEmployee?.formData.role;
export const getCreateSawatzkyEmployeeFormStatus = (state: StateSchema) => state.createSawatzkyEmployee?.formData.status;
export const getCreateSawatzkyEmployeeError = (state: StateSchema) => state.createSawatzkyEmployee?.error;
export const getCreateSawatzkyEmployeeIsLoading = (state: StateSchema) => state.createSawatzkyEmployee?.isLoading;
export const getCreateSawatzkyEmployeeIsOpen = (state: StateSchema) => state.createSawatzkyEmployee?.isOpen;
