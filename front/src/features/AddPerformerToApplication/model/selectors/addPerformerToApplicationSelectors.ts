import { StateSchema } from 'app/providers';

export const getAddPerformerToApplicationFormIsOpen = (state: StateSchema) => state.addPerformerToApplicationForm?.isOpen;
export const getAddPerformerToApplicationPerformer = (state: StateSchema) => state.addPerformerToApplicationForm?.formData?.data.performer;
export const getAddPerformerToApplicationPriority = (state: StateSchema) => state.addPerformerToApplicationForm?.formData?.data.priority;
export const getAddPerformerToApplicationFormData = (state: StateSchema) => state.addPerformerToApplicationForm?.formData.data;
