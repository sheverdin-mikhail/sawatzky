import { StateSchema } from 'app/providers';

// sawatzky
export const getCreateEmployeeSawatzkyFormData = (state: StateSchema) => state.createEmployee?.sawatzkyFormData;
export const getCreateEmployeeSawatzkyFormWorkObjectGroup = (state: StateSchema) => state.createEmployee?.sawatzkyFormData.workObjectGroup;
export const getCreateEmployeeSawatzkyFormWorkObject = (state: StateSchema) => state.createEmployee?.sawatzkyFormData.workObject;
export const getCreateEmployeeSawatzkyFormWorkingObjects = (state: StateSchema) => state.createEmployee?.sawatzkyFormData.workingObjects;
export const getCreateEmployeeSawatzkyFormPosition = (state: StateSchema) => state.createEmployee?.sawatzkyFormData.position;
export const getCreateEmployeeSawatzkyFormRole = (state: StateSchema) => state.createEmployee?.sawatzkyFormData.role;
export const getCreateEmployeeSawatzkyFormStatus = (state: StateSchema) => state.createEmployee?.sawatzkyFormData.status;
export const getCreateEmployeeError = (state: StateSchema) => state.createEmployee?.error;
export const getCreateEmployeeIsLoading = (state: StateSchema) => state.createEmployee?.isLoading;
export const getCreateEmployeeIsOpen = (state: StateSchema) => state.createEmployee?.isOpen;

// employee
export const getCreateEmployeeFormLegalEntity = (state: StateSchema) => state.createEmployee?.formData.legalEntity;
export const getCreateEmployeeFormData = (state: StateSchema) => state.createEmployee?.formData;
export const getCreateEmployeeFormRole = (state: StateSchema) => state.createEmployee?.formData.role;
export const getCreateEmployeeFormStatus = (state: StateSchema) => state.createEmployee?.formData.status;

// user
export const getCreateEmployeeUserFormFio = (state: StateSchema) => state.createEmployee?.user?.fio;
export const getCreateEmployeeUserFormUsername = (state: StateSchema) => state.createEmployee?.user?.username;
export const getCreateEmployeeUserFormPassword = (state: StateSchema) => state.createEmployee?.user?.password;
export const getCreateEmployeeUserFormPhoneNumber = (state: StateSchema) => state.createEmployee?.user?.phoneNumber;
export const getCreateEmployeeUser = (state: StateSchema) => state.createEmployee?.user;
