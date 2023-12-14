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
import { useSelector } from 'react-redux';

interface UserDataResult extends User {
    isSawatzky: boolean;
    isDispatcher: boolean;
    isPerformer: boolean;
    isInitiator: boolean;
    isAdmin: boolean;
    isDispatcherPerformer: boolean;
}

export const useUserData = (): UserDataResult => {
  const user = useSelector(getUserData) ?? {} as User;
  const isSawatzky = useSelector(userIsSawatzky);
  const isDispatcher = useSelector(userIsDispatcher);
  const isPerformer = useSelector(userIsPerformer);
  const isInitiator = useSelector(userIsInitiator);
  const isAdmin = useSelector(userIsAdmin);
  const isDispatcherPerformer = useSelector(userIsDispatcherPerformer);

  return {
    ...user,
    isSawatzky,
    isDispatcher,
    isPerformer,
    isInitiator,
    isAdmin,
    isDispatcherPerformer,
  };
};
