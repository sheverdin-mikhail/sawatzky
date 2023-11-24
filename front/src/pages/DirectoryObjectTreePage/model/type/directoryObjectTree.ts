export interface directoryObjectTreeType {
  id?: string;
  department: string;
  name: string;
  position: string;
  object: objectTreeType[];
}

export interface objectTreeType {
  number: string;
  name: string;
  counterparties: string[];
  employee: string[];
}
