


export  interface AddWorkTaskFormData {
    workTaskGroup?: number;
    name?: string;
    price?: string;
    actualTime?: string;
}



export interface AddWorkTaskFormSchema {
    formData?: AddWorkTaskFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}