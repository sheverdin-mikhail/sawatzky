import { User } from 'entities/User';

export type Employee = Omit<User, 'employee'>

export enum EmployeeRole {
    DISPATCHER = 'dispatcher',
    PERFORMER = 'preformer',
    DISPATCHER_PERFORMER = 'dispatcherPerformer'
}
