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
    sawatzky?: boolean;
    prepayment?: boolean;
    status?: boolean;

    workObject?: number;
    workObjectsGroup?: number;
    workTaskGroups?: number[];
    workMaterialGroups?: number[];
}

export interface CreateLegalEntitySchema {
    formData: CreateLegalEntityFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}
