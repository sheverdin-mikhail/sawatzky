export type { Employee, EmployeeSchema } from './model/type/employee';
export { EmployeeRole, EmployeeRoleValue } from './model/type/employee';

export {
  employeeActions,
  employeeReducer,
  getEmployee,
} from './model/slice/employeeSlice';
export { deleteEmployee } from './model/services/deleteEmployee';
export { fetchEmployeeList } from './model/services/fetchEmployeeList';
