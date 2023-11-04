import { StateSchema } from 'app/providers';

export const getUserFullname = (state: StateSchema) => state.user.data?.fio;
