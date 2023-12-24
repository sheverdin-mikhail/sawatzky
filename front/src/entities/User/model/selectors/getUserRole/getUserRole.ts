import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { Employee, EmployeeRole } from 'entities/Employee';
import { SawatzkyEmployee } from 'entities/SawatzkyEmployee';

export const getUserData = (state: StateSchema) => state.user.data;
export const userIsSawatzky = (state: StateSchema) => Boolean(state.user.data?.sawatzkyEmployee);

export const getUserEmployee = createSelector(getUserData, (data): Employee | SawatzkyEmployee | undefined => {
  if (data?.sawatzkyEmployee) {
    return data.sawatzkyEmployee;
  }
  if (data?.employee) {
    return data.employee;
  }
  return undefined;
});

export const getUserRole = createSelector(getUserEmployee, (employee) => employee?.role);
export const userIsInitiator = createSelector(getUserRole, (role) => role === EmployeeRole.INITIATOR);
export const userIsAdmin = createSelector(getUserRole, (role) => role === EmployeeRole.ADMIN);
export const userIsDispatcher = createSelector(getUserRole, (role) => role === EmployeeRole.DISPATCHER || role === EmployeeRole.DISPATCHER_PERFORMER);
export const userIsPerformer = createSelector(getUserRole, (role) => role === EmployeeRole.PERFORMER || role === EmployeeRole.DISPATCHER_PERFORMER);
export const userIsDispatcherPerformer = createSelector(getUserRole, (role) => role === EmployeeRole.DISPATCHER_PERFORMER);
