import { WorkMaterial } from 'entities/WorkMaterial';
import { WorkMaterialGroupItem } from 'entities/WorkMaterialGroup';

export const enum FormStep {
    CHOSE = 'chose',
    ACTUAL = 'actual'
}

export interface ApplicationWorkMaterialForPatch {
    workMaterial: string;
    actualCount: number;
}

export interface AddWorkMaterialApplicationFormData {
    prevWorkMaterials?: ApplicationWorkMaterialForPatch[];
    workMaterial?: ApplicationWorkMaterialForPatch;
    applicationId?: string;
}

export interface AddWorkMaterialApplicationFormSchema {
    formData: AddWorkMaterialApplicationFormData;
    selectedItem?: WorkMaterial;
    actualCountText?: string;

    formStep: FormStep;
    workMaterialGroups?: WorkMaterialGroupItem[];
    isLoading?: boolean;
    error?: string;
    isOpen?: boolean;

    _init: boolean;
}
