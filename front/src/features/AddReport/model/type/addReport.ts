export interface AddReportFormData {
  workObjectGroup?: number;
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
