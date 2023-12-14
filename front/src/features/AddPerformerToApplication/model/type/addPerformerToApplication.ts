import { ApplicationPerformer, Performer, PerformerPriority } from 'entities/Performer';

interface FormData {
    performer?: number;
    priority?: string;
}

export interface AddPerformerToApplicationFormData {
    newPerformer: FormData;
    prevPerformers?: ApplicationPerformer[];
    applicationId?: string;
}

export interface AddPerformerToApplicationFormSchema {
    formData: AddPerformerToApplicationFormData;
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}
