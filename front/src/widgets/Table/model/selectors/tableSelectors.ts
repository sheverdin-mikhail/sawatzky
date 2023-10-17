import { StateSchema } from "app/providers";


export const getTableHeader = (state: StateSchema) => state.table?.header
export const getTableItems = (state: StateSchema) => state.table?.items
export const getTableInit = (state: StateSchema) => state.table?._init
export const getTableSelectedItems = (state: StateSchema) => state.table?.selectedItems
export const getTableSelectedAll= (state: StateSchema) => state.table?.selectedAll