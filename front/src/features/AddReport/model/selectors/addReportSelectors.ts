import { StateSchema } from 'app/providers';

export const getAddReportFormData = (state: StateSchema) => state.addReportForm?.formData;

export const getAddReportFormWorkObjectGroup = (state: StateSchema) => state.addReportForm?.formData.workObjectsGroup;
export const getAddReportFormWorkObject = (state: StateSchema) => state.addReportForm?.formData.workObject;

export const getAddReportError = (state: StateSchema) => state.addReportForm?.error;
export const getAddReportIsLoading = (state: StateSchema) => state.addReportForm?.isLoading;
export const getAddReportIsOpen = (state: StateSchema) => state.addReportForm?.isOpen;
