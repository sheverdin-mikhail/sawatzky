import { EmployeeRole } from 'entities/Employee';
import { User } from 'entities/User';
import { useMemo } from 'react';
import { USER_LOCALSTORAGE_DATA } from 'shared/const/localStorage';

interface UserDataResult extends User {
    isSawatzky: boolean;
    isDispatcher: boolean;
    isPerformer: boolean;
    isDispatcherPerformer: boolean;
}

export const useUserData = (): UserDataResult => {
  const user: User = JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_DATA) ?? '');

  const isSawatzky = useMemo(() => {
    if (user.sawatzkyEmployee) {
      return true;
    }
    return false;
  }, [user.sawatzkyEmployee]);

  const isDispatcher = useMemo(() => {
    if (user.employee?.role === EmployeeRole.DISPATCHER || user.sawatzkyEmployee?.role === EmployeeRole.DISPATCHER) {
      return true;
    }
    return false;
  }, [user]);

  const isPerformer = useMemo(() => {
    if (user.employee?.role === EmployeeRole.PERFORMER || user.sawatzkyEmployee?.role === EmployeeRole.PERFORMER) {
      return true;
    }
    return false;
  }, [user]);

  const isDispatcherPerformer = useMemo(() => {
    if (user.employee?.role === EmployeeRole.DISPATCHER_PERFORMER || user.sawatzkyEmployee?.role === EmployeeRole.DISPATCHER_PERFORMER) {
      return true;
    }
    return false;
  }, [user]);

  return {
    ...user,
    isSawatzky,
    isDispatcher,
    isPerformer,
    isDispatcherPerformer,
  };
};
