export type { UserSchema, User } from './model/types/user';
export { getUser } from './model/selectors/getUser/getUser';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';

export { userActions, userReducer } from './model/slice/userSlice';

