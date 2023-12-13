import { PerformerPriority } from 'entities/Performer';

interface FormData {
    performer?: number;
    priority?: string;
}

export interface AddPerformerToApplicationFormData {
    data: FormData;
    applicationId?: string;
}

export interface AddPerformerToApplicationFormSchema {
    formData: AddPerformerToApplicationFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}
