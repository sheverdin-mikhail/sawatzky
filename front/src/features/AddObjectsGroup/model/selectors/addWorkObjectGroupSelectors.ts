import { StateSchema } from 'app/providers';

export const getWorkObjectGroupName = (state: StateSchema) => state.addWorkObjectGroupForm?.formData?.name;
