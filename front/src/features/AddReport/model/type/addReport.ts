export interface AddReportFormData {
  workObjectsGroup?: number;
  workObject?: number;
  legalEntity?: number;
  employee?: number;
}

export interface AddReportSchema {
  formData: AddReportFormData;
  isLoading?: boolean;
  error?: string;
  isOpen?: boolean;
}
