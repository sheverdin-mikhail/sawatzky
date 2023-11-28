import { StateSchema } from 'app/providers';

export const getAddDocumentFormIsOpen = (state: StateSchema) => state.addDocumentForm?.isOpen;
export const getAddDocumentFile = (state: StateSchema) => state.addDocumentForm?.formData?.file;
export const getAddDocumentDocType = (state: StateSchema) => state.addDocumentForm?.formData?.docType;
export const getAddDocumentFormData = (state: StateSchema) => state.addDocumentForm?.formData;
