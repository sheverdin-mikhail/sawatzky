export interface AddDocumentFormData {
    file?: string;
    name?: string;
    docType?: DocType;
}

export interface AddDocumentFormSchema {
    formData?: AddDocumentFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}

export enum DocEntity {
    APPLICATION = 'application',
    LEGAL_ENTITY = 'legalEntity',
    EMPLOYEE = 'empmloyee'
}

export enum DocType {
    ACT = 'act',
    OTHER = 'other',
    PAYMENT_SLIPS = 'paymentSlip',
    POWEER_OF_ATTORNEY = 'powerOfAttorney'
}
