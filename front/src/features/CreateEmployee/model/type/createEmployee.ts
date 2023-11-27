import { EmployeeRole } from 'entities/Employee';

export interface CreateEmployeeFormData {
    workObjectGroup?: number;
    workObject?: number;
    fio?: string;
    role?: string;
    status?: boolean;
    workingObjects?: number[];
}

export interface CreateEmployeeSchema {
    formData: CreateEmployeeFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}

export interface EmployeeRoleOption {
    value: EmployeeRole;
    text: string;
}
