import { StateSchema } from 'app/providers';

export const getCreateLegalEntityFormINN = (state: StateSchema) => state.createLegalEntityForm?.formData.INN;
export const getCreateLegalEntityFormActualAddress = (state: StateSchema) => state.createLegalEntityForm?.formData.actualAddress;
export const getCreateLegalEntityFormBank = (state: StateSchema) => state.createLegalEntityForm?.formData.bank;
export const getCreateLegalEntityFormBik = (state: StateSchema) => state.createLegalEntityForm?.formData.bik;
export const getCreateLegalEntityFormCorrespondentAccount = (state: StateSchema) => state.createLegalEntityForm?.formData.correspondentAccount;
export const getCreateLegalEntityFormHead = (state: StateSchema) => state.createLegalEntityForm?.formData.head;
export const getCreateLegalEntityFormIs = (state: StateSchema) => state.createLegalEntityForm?.formData.sawatzki;
export const getCreateLegalEntityFormLegalAddress = (state: StateSchema) => state.createLegalEntityForm?.formData.legalAddress;
export const getCreateLegalEntityFormMail = (state: StateSchema) => state.createLegalEntityForm?.formData.mail;
export const getCreateLegalEntityFormName = (state: StateSchema) => state.createLegalEntityForm?.formData.name;
export const getCreateLegalEntityFormPhone = (state: StateSchema) => state.createLegalEntityForm?.formData.phone;
export const getCreateLegalEntityFormSettlementAccount = (state: StateSchema) => state.createLegalEntityForm?.formData.settlementAccount;
export const getCreateLegalEntityFormData = (state: StateSchema) => state.createLegalEntityForm?.formData;

export const getCreateLegalEntityFormWorkObjectGroup = (state: StateSchema) => state.createLegalEntityForm?.formData.workObjectGroup;
export const getCreateLegalEntityFormWorkObject = (state: StateSchema) => state.createLegalEntityForm?.formData.workObject;
export const getCreateLegalEntityFormWorkTaskGroup = (state: StateSchema) => state.createLegalEntityForm?.formData.workTaskGroup;
export const getCreateLegalEntityFormWorkMaterialGroup = (state: StateSchema) => state.createLegalEntityForm?.formData.workMaterialGroup;

export const getCreateLegalEntityError = (state: StateSchema) => state.createLegalEntityForm?.error;
export const getCreateLegalEntityIsLoading = (state: StateSchema) => state.createLegalEntityForm?.isLoading;
export const getCreateLegalEntityIsOpen = (state: StateSchema) => state.createLegalEntityForm?.isOpen;
