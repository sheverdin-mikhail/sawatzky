import { StateSchema } from 'app/providers';

const getApplicationDetailActs = (state: StateSchema) => state.applicationDetail?.isLoading;
