import { StateSchema } from 'app/providers';

export const getFormApplicationTitle = (state: StateSchema) => state.createApplication?.form?.title ?? '';
export const getFormApplicationSubject = (state: StateSchema) => state.createApplication?.form?.subject ?? '';
export const getFormApplicationDescription = (state: StateSchema) => state.createApplication?.form?.description ?? '';
export const getFormApplicationStartWorkDate = (state: StateSchema) => state.createApplication?.form?.startWorkDate ?? '';
export const getFormApplicationEndWorkDate = (state: StateSchema) => state.createApplication?.form?.endWorkDate ?? '';
export const getFormApplication = (state: StateSchema) => state.createApplication?.form;

export const getFormApplicationError = (state: StateSchema) => state.createApplication?.error ?? '';
export const getFormApplicationIsLoading = (state: StateSchema) => state.createApplication?.isLoading;
