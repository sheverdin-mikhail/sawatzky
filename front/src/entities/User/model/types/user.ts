import { Employee } from 'entities/Employee';
import { SawatzkyEmployee } from 'entities/SawatzkyEmployee';

export interface User {
    id: string;
    username: string;
    fio?: string;
    employee?: Employee;
    sawatzkyEmployee?: SawatzkyEmployee;
    phoneNumber?: string;
}

export interface UserSchema {
    data?: User;
    isLoading: boolean;
    error?: string;
    _inited?: boolean;
}
