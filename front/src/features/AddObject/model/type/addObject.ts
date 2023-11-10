export interface FormData {
    name?: string;
    code?: string;
    contractNumber?: string;
    address?: string;
    workObjectGroup?: number;
}

export interface AddWorkObjectFormSchema {
    formData?: FormData;
    groupId?: number;
    isOpen?: boolean;
    error?: string;
    isLoading?: boolean;
}
