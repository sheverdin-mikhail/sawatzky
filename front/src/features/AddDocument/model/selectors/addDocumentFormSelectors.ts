import { StateSchema } from 'app/providers';

export const getAddDocumentTaskFormIsOpen = (state: StateSchema) => state.addDocumentForm?.isOpen;
export const getAddDocumentTaskName = (state: StateSchema) => state.addDocumentForm?.formData?.name;
export const getAddDocumentTaskFile = (state: StateSchema) => state.addDocumentForm?.formData?.file;
export const getAddDocumentTaskDocType = (state: StateSchema) => state.addDocumentForm?.formData?.docType;
