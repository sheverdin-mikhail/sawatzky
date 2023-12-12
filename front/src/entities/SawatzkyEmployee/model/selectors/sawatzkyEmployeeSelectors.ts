import { createSelector } from '@reduxjs/toolkit';
import { getSawatzkyEmployee } from '../slice/sawatzkyEmployeeSlice';

export const getSawatzkyEmployeeUserId = createSelector(getSawatzkyEmployee.selectById, (employee) => employee?.user.id);
