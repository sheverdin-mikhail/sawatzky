import { EmployeeRole } from 'entities/Employee';

export interface UserFormData {
    fio?: string;
    phoneNumber?: string;
    username?: string;
    password?: string;
}

export interface CreateSawatzkyEmployeeFormData {
    workObjectGroup?: number;
    workObject?: number;
    user: UserFormData;
    position?: string;
    role?: string;
    status?: boolean;
    workingObjects?: number[];
}

export interface CreateSawatzkyEmployeeSchema {
    formData: CreateSawatzkyEmployeeFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}

export interface EmployeeRoleOption {
    value: EmployeeRole;
    text: string;
}
