import { StateSchema } from 'app/providers';

export const getLoginState = (state: StateSchema) => state?.loginForm;
