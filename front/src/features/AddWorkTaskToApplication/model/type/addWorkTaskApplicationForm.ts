<<<<<<< HEAD
import { WorkTask } from 'entities/WorkTask';
import { WorkTaskGroupItem } from 'entities/WorkTaskGroup';
=======
import { WorkTask } from "entities/WorkTask";
import { WorkTaskGroupItem } from "entities/WorkTaskGroup";



>>>>>>> main

export const enum FormStep {
    CHOSE='chose',
    ACTUAL='actual'
}

export interface ApplicationWorkTaskForPatch {
    workTask: string;
    actualTime: number;
}

export interface AddWorkTaskApplicationFormData {
    prevWorkTasks?: ApplicationWorkTaskForPatch[];
<<<<<<< HEAD
    workTask?: ApplicationWorkTaskForPatch;
=======
    workTask?: ApplicationWorkTaskForPatch; 
>>>>>>> main
    applicationId?: string;
}

export interface AddWorkTaskApplicationFormSchema {
    formData: AddWorkTaskApplicationFormData;
    selectedItem?: WorkTask;
    actualTimeText?: string;

    formStep: FormStep;
    workTaskGroups?: WorkTaskGroupItem[];
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;

    _init: boolean;
<<<<<<< HEAD
}
=======
}
>>>>>>> main
