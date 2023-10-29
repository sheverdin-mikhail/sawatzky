


export  interface AddWorkMaterialFormData {
    workMaterialGroup?: number;
    name?: string;
    price?: string;
    time?: string;
    status?: boolean;
}



export interface AddWorkMaterialFormSchema {
    formData?: AddWorkMaterialFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}