import { StateSchema } from 'app/providers';

export const getUserInited = (state: StateSchema) => state.user._inited;
