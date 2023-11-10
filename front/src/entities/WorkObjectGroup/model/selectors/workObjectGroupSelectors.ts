import { StateSchema } from 'app/providers';

export const getWorkObectGroupError = (state: StateSchema) => state.workObjectGroup?.error;
export const getWorkObectGroupIsLoading = (state: StateSchema) => state.workObjectGroup?.isLoading;
