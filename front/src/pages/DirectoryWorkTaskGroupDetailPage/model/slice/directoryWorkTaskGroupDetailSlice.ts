import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { WorkTask } from 'entities/WorkTask';
import { StateSchema } from 'app/providers';
import { WorkTaskGroupItem } from 'entities/WorkTaskGroup';
import { DirectoryWorkTaskGroupDetailSchema } from '../type/directoryWorkTaskGroupDetail';
import { fetchWorkTaskListByGroupId } from '../services/fetchWorkTaskListByGroupId';

const directoryWorkTaskGroupDetailAdapter = createEntityAdapter<WorkTask>({
<<<<<<< HEAD
    selectId: (workTask) => workTask.id,
});

export const getDirectoryWorkTaskGroupDetail = directoryWorkTaskGroupDetailAdapter.getSelectors<StateSchema>(
    (state) => state.directoryWorkTaskGroupDetail || directoryWorkTaskGroupDetailAdapter.getInitialState(),
);
=======
    selectId: ( workTask ) => workTask.id
})
  
export const getDirectoryWorkTaskGroupDetail = directoryWorkTaskGroupDetailAdapter.getSelectors<StateSchema>(
    (state) => state.directoryWorkTaskGroupDetail || directoryWorkTaskGroupDetailAdapter.getInitialState()
)
>>>>>>> main

export const directoryWorkTaskGroupDetailSlice = createSlice({
    name: 'directoryWorkTaskGroupDetail',
    initialState: directoryWorkTaskGroupDetailAdapter.getInitialState<DirectoryWorkTaskGroupDetailSchema>({
        ids: [],
        entities: {},
        error: undefined,
<<<<<<< HEAD
        isLoading: false,
    }),
    reducers: {},
    extraReducers: (builder) => builder
    // Аунтификация пользователя
        .addCase(fetchWorkTaskListByGroupId.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        })
        .addCase(fetchWorkTaskListByGroupId.fulfilled, (state, action: PayloadAction<WorkTaskGroupItem>) => {
            state.isLoading = false;
            if (action.payload.tasks) {
                directoryWorkTaskGroupDetailAdapter.setAll(state, action.payload.tasks);
            }
            state.groupName = action.payload.name;
        })
        .addCase(fetchWorkTaskListByGroupId.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),

});
=======
        isLoading: false
    }),
    reducers: {},
    extraReducers: (builder) => builder
    //Аунтификация пользователя
        .addCase(fetchWorkTaskListByGroupId.pending, (state)=>{
            state.error = undefined
            state.isLoading = true
        })
        .addCase(fetchWorkTaskListByGroupId.fulfilled, (state, action: PayloadAction<WorkTaskGroupItem>)=>{
            state.isLoading = false
            if(action.payload.tasks){
                directoryWorkTaskGroupDetailAdapter.setAll(state, action.payload.tasks)
            }
            state.groupName = action.payload.name

        })
        .addCase(fetchWorkTaskListByGroupId.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
    
  
})
>>>>>>> main

export const { actions: directoryWorkTaskGroupDetailActions } = directoryWorkTaskGroupDetailSlice;
export const { reducer: directoryWorkTaskGroupDetailReducer } = directoryWorkTaskGroupDetailSlice;
