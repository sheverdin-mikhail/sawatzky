export interface FormData {
    name?: string;
}

export interface AddWorkObjectGroupFormSchema {
    formData?: FormData;
    isOpen?: boolean;
    error?: string;
    isLoading?: boolean;
}
