import { WorkTask } from "entities/WorkTask";
import { WorkTaskGroupItem } from "entities/WorkTaskGroup";



export  interface AddWorkTaskApplicationFormData {
    selectedItems?: WorkTask[];
}



export interface AddWorkTaskApplicationFormSchema {
    formData?: AddWorkTaskApplicationFormData;
    workTaskGroups?: WorkTaskGroupItem[];
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;
}