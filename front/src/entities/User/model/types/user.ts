import { Employee } from "entities/Employee";

export interface User {
    id: string;
    username: string;
    fio?: string;
    employee?: Employee;
    phone_number?: string;
}


export interface UserSchema {
    data?: User;
    isLoading: boolean;
    error?: string;
    _inited?: boolean;
}