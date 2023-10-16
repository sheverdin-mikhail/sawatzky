


export  interface AddWorkTaskFormData {
    workTaskGroup?: number;
    name?: string;
    price?: string;
    time?: string;
    status?: boolean;
}



export interface AddWorkTaskFormSchema {
    formData?: AddWorkTaskFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}