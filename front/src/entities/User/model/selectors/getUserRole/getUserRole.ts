import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';

export const getUserData = (state: StateSchema) => state.user.data;
export const isSawatzky = (state: StateSchema) => Boolean(state.user.data?.sawatzkyEmployee);

export const getUserEmployee = createSelector(getUserData, (data) => {
  if (data?.sawatzkyEmployee) {
    return data.sawatzkyEmployee;
  }
  if (data?.employee) {
    return data.employee;
  }

  return undefined;
});

export const getUserRole = createSelector(getUserEmployee, (employee) => employee?.role);
