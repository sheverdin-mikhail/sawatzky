import {  createSlice } from '@reduxjs/toolkit'
import { DirectoryNavigaionSchema } from '../type/directoryNavigation'


const initialState: DirectoryNavigaionSchema = {
    // links: DirectoryPath
}

export const directoryNavigationSlice = createSlice({
  name: 'applicationsPage',
  initialState,
  reducers: {
  },
 
})

export const { actions: directoryNavigaionActions } = directoryNavigaionSlice
export const { reducer: directoryNavigaionReducer } = directoryNavigaionSlice
