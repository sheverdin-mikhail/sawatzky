export interface CreateLegalEntityFormData {
    name?: string;
    head?: string;
    legalAddress?: string;
    actualAddress?: string;
    phone?: string;
    mail?: string;
    INN?: string;
    settlementAccount?: string;
    correspondentAccount?: string;
    bank?: string;
    bik?: string;
    sawatzki?: boolean;
    prepayment?: boolean;
    status?: boolean;

    workObject?: number;
    workObjectGroup?: number;
    workTaskGroup?: number;
    workMaterialGroup?: number;
}

export interface CreateLegalEntitySchema {
    formData: CreateLegalEntityFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}
