import { fetchApplicationsList } from './../services/fetchApplicationsList/fetchApplicationsList';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { ApplicationsPageSchema } from '../type/applicationsPage'
import { StateSchema } from 'app/providers'
import { Application } from 'entities/Application'



export const applicationsPageAdapter = createEntityAdapter<Application>({
    selectId: ( application ) => application.id
  })
  
export const getApplicationsPage = applicationsPageAdapter.getSelectors<StateSchema>(
  (state) => state.applicationsPage || applicationsPageAdapter.getInitialState()
)



export const applicationsPageSlice = createSlice({
  name: 'applicationsPage',
  initialState: applicationsPageAdapter.getInitialState<ApplicationsPageSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined
  }),
  reducers: {
    
  },
  extraReducers: (builder) => builder 
  //Аунтификация пользователя
    .addCase(fetchApplicationsList.pending, (state, action)=>{
      state.error = undefined
      state.isLoading = true
    })
    .addCase(fetchApplicationsList.fulfilled, (state, action: PayloadAction<Application[]>)=>{
        state.isLoading = false
        // @ts-ignore
        applicationsPageAdapter.setAll(state, action.payload)

    })
    .addCase(fetchApplicationsList.rejected, (state, action)=>{
        state.isLoading = false
        state.error = action.payload
    })
})

export const { actions: applicationsPageActions } = applicationsPageSlice
export const { reducer: applicationsPageReducer } = applicationsPageSlice
