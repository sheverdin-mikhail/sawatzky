import {  PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TableItemType, TableSchema, TableType } from '../type/table';


const initialState: TableSchema = {
    header: {
    },
    items: [],
    selectedItems: [],
    error: undefined,
    isLoading: false,
    _init: false,
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {

    toggleSelectAllItems: (state) => {
        state.selectedAll = !state.selectedAll
        if(state.selectedItems?.length === state.items?.length){
            state.selectedItems = []
        }else {
            state.selectedItems = state.items
        }
        
    },
    toggleSelectItem: (state, action: PayloadAction<TableItemType>) => {
        if(state.selectedItems?.find((item)=>item.id === action.payload.id)) {
            state.selectedItems = state.selectedItems.filter(item => item.id !== action.payload.id)
        }else{
            state.selectedItems?.push(action.payload)
        }
        if(state.selectedItems?.length  === state.items?.length){
            state.selectedAll = true
        }else {
            state.selectedAll = false
        }
    },
    initTable: (state, action: PayloadAction<TableType>)=>{
        state.header = action.payload.header
        state.items = action.payload.items
        state._init = true
    }
  },
 
})

export const { actions: tableActions } = tableSlice
export const { reducer: tableReducer } = tableSlice
