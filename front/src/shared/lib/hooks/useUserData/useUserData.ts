import {
  User,
  userIsDispatcher,
  userIsDispatcherPerformer,
  userIsPerformer,
  userIsSawatzky,
} from 'entities/User';
import { getUserData, userIsInitiator } from 'entities/User/model/selectors/getUserRole/getUserRole';
import { useSelector } from 'react-redux';

interface UserDataResult extends User {
    isSawatzky: boolean;
    isDispatcher: boolean;
    isPerformer: boolean;
    isInitiator: boolean;
    isDispatcherPerformer: boolean;
}

export const useUserData = (): UserDataResult => {
  const user = useSelector(getUserData) ?? {} as User;
  const isSawatzky = useSelector(userIsSawatzky);
  const isDispatcher = useSelector(userIsDispatcher);
  const isPerformer = useSelector(userIsPerformer);
  const isInitiator = useSelector(userIsInitiator);
  const isDispatcherPerformer = useSelector(userIsDispatcherPerformer);

  return {
    ...user,
    isSawatzky,
    isDispatcher,
    isPerformer,
    isInitiator,
    isDispatcherPerformer,
  };
};
