import {
  User,
  userIsDispatcher,
  userIsDispatcherPerformer,
  userIsPerformer,
  userIsSawatzky,
  getUserData,
  userIsAdmin,
  userIsInitiator,
} from 'entities/User';
import { TokensData } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { USER_LOCALSTORAGE_TOKENS } from 'shared/const/localStorage';

interface UserDataResult extends User {
    isAuth: boolean;
    isSawatzky: boolean;
    isDispatcher: boolean;
    isPerformer: boolean;
    isInitiator: boolean;
    isAdmin: boolean;
    isDispatcherPerformer: boolean;
    tokens: TokensData | null;
}

export const useUserData = (): UserDataResult => {
  const user = useSelector(getUserData) ?? {} as User;
  const isSawatzky = useSelector(userIsSawatzky);
  const isDispatcher = useSelector(userIsDispatcher);
  const isPerformer = useSelector(userIsPerformer);
  const isInitiator = useSelector(userIsInitiator);
  const isAdmin = useSelector(userIsAdmin);
  const isDispatcherPerformer = useSelector(userIsDispatcherPerformer);
  const isAuth = Boolean(user);

  const tokensJson = localStorage.getItem(USER_LOCALSTORAGE_TOKENS);
  let tokens: TokensData | null = null;
  if (tokensJson) {
    tokens = JSON.parse(tokensJson);
  }

  return {
    ...user,
    isAuth,
    isSawatzky,
    isDispatcher,
    isPerformer,
    isInitiator,
    isAdmin,
    isDispatcherPerformer,
    tokens,
  };
};
