import { TableLoader } from 'widgets/TableLoader';

export const useTableLoader = (isLoadind: boolean, content: any) => {
  if (isLoadind) {
    <TableLoader />;
  }
  return content;
};
