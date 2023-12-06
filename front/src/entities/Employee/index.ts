export type { Employee, EmployeeSchema } from './model/type/employee';
export { EmployeeRole } from './model/type/employee';

export {
  employeeActions,
  employeeReducer,
  getEmployee,
} from './model/slice/employeeSlice';
export { deleteWorkObject } from './model/services/deleteEmployee';
export { fetchEmployeeList } from './model/services/fetchEmployeeList';
