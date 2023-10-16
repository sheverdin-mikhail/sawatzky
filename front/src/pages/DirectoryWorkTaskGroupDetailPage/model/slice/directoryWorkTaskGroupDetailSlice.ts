import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { WorkTask } from 'entities/WorkTask'
import { StateSchema } from 'app/providers'
import { DirectoryWorkTaskGroupDetailSchema } from '../type/directoryWorkTaskGroupDetail'
import { fetchWorkTaskListByGroupId } from '../services/fetchWorkTaskListByGroupId'
import { WorkTaskGroupItem } from 'entities/WorkTaskGroup'

const directoryWorkTaskGroupDetailAdapter = createEntityAdapter<WorkTask>({
    selectId: ( workTask ) => workTask.id
  })
  
  export const getDirectoryWorkTaskGroupDetail = directoryWorkTaskGroupDetailAdapter.getSelectors<StateSchema>(
    (state) => state.directoryWorkTaskGroupDetail || directoryWorkTaskGroupDetailAdapter.getInitialState()
  )

export const directoryWorkTaskGroupDetailSlice = createSlice({
  name: 'directoryWorkTaskGroupDetail',
  initialState: directoryWorkTaskGroupDetailAdapter.getInitialState<DirectoryWorkTaskGroupDetailSchema>({
    ids: [],
    entities: {},
    error: undefined,
    isLoading: false
  }),
  reducers: {},
  extraReducers: (builder) => builder
    //Аунтификация пользователя
    .addCase(fetchWorkTaskListByGroupId.pending, (state, action)=>{
      state.error = undefined
      state.isLoading = true
    })
    .addCase(fetchWorkTaskListByGroupId.fulfilled, (state, action: PayloadAction<WorkTaskGroupItem>)=>{
        state.isLoading = false
        if(action.payload.workTasks){
          directoryWorkTaskGroupDetailAdapter.setAll(state, action.payload.workTasks)
        }
        state.groupName = action.payload.name

    })
    .addCase(fetchWorkTaskListByGroupId.rejected, (state, action)=>{
        state.isLoading = false
        state.error = action.payload
    })
    
  
})

export const { actions: directoryWorkTaskGroupDetailActions } = directoryWorkTaskGroupDetailSlice
export const { reducer: directoryWorkTaskGroupDetailReducer } = directoryWorkTaskGroupDetailSlice
