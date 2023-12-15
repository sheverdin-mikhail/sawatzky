import { StateSchema } from 'app/providers';

export const getAddPerformerToApplicationFormIsOpen = (state: StateSchema) => state.addPerformerToApplicationForm?.isOpen;
export const getAddPerformerToApplicationPerformer = (state: StateSchema) => state.addPerformerToApplicationForm?.formData?.newPerformer.performer;
export const getAddPerformerToApplicationPriority = (state: StateSchema) => state.addPerformerToApplicationForm?.formData?.newPerformer.priority;
export const getAddPerformerToApplicationFormData = (state: StateSchema) => state.addPerformerToApplicationForm?.formData;
