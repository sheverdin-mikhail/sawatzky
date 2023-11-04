import { StateSchema } from 'app/providers';

export const getLoginIsLoading = (state: StateSchema) => state.loginForm?.isLoading || false;
