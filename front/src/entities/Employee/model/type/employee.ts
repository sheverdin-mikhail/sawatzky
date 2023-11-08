import { User } from 'entities/User';

export type Employee = Omit<User, 'employee'>
