import { EmployeeRole } from 'entities/Employee';

export interface UserFormData {
    fio?: string;
    phoneNumber?: string;
    username?: string;
    password?: string;
}

export interface CreateSawatzkyEmployeeFormData {
    user?: UserFormData;
    workObjectGroup?: number;
    workObject?: number;
    position?: string;
    role?: string;
    status?: boolean;
    workingObjects?: number[];
}

export interface CreateEmployeeFormData {
    user?: UserFormData;
    legalEntity?: number;
    role?: string;
    status?: boolean;
}

export interface CreateEmployeeSchema {
    sawatzkyFormData: CreateSawatzkyEmployeeFormData;
    formData: CreateEmployeeFormData;
    user: UserFormData;

    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}

export interface EmployeeRoleOption {
    value: EmployeeRole;
    text: string;
}
