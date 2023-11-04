<<<<<<< HEAD
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { WorkTaskGroupItem, WorkTaskGroupSchema } from '../type/workTaskGroup';
import { fetchWorkTaskGroupList } from '../services/fetchWorkTaskGroupList';
import { deleteWorkTaskGroup } from '../services/deleteWorkTaskGroup';

export const workTaskGroupAdapter = createEntityAdapter<WorkTaskGroupItem>({
    selectId: (application) => application.id,
});

export const getWorkTaskGroup = workTaskGroupAdapter.getSelectors<StateSchema>(
    (state) => state.workTaskGroup || workTaskGroupAdapter.getInitialState(),
);
=======
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers'
import { WorkTaskGroupItem, WorkTaskGroupSchema } from '../type/workTaskGroup'
import { fetchWorkTaskGroupList } from '../services/fetchWorkTaskGroupList'
import { deleteWorkTaskGroup } from '../services/deleteWorkTaskGroup'



export const workTaskGroupAdapter = createEntityAdapter<WorkTaskGroupItem>({
    selectId: ( application ) => application.id
})
  
export const getWorkTaskGroup = workTaskGroupAdapter.getSelectors<StateSchema>(
    (state) => state.workTaskGroup || workTaskGroupAdapter.getInitialState()
)


>>>>>>> main

export const workTaskGroupSlice = createSlice({
    name: 'workTaskGroup',
    initialState: workTaskGroupAdapter.getInitialState<WorkTaskGroupSchema>({
        ids: [],
        entities: {},
        isLoading: false,
        error: undefined,
    }),
    reducers: {
<<<<<<< HEAD
        setWorkTaskGroupList: (state, action: PayloadAction<WorkTaskGroupItem[]>) => {
            workTaskGroupAdapter.setAll(state, action.payload);
        },
    },
    extraReducers: (builder) => builder
    // Получение списка групп услуг
        .addCase(fetchWorkTaskGroupList.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
        })
        .addCase(fetchWorkTaskGroupList.fulfilled, (state, action: PayloadAction<WorkTaskGroupItem[]>) => {
            state.isLoading = false;
            workTaskGroupAdapter.setAll(state, action.payload);
        })
        .addCase(fetchWorkTaskGroupList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    // Удаление группы услуг
        .addCase(deleteWorkTaskGroup.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        })
        .addCase(deleteWorkTaskGroup.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(deleteWorkTaskGroup.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }),
});
=======
        setWorkTaskGroupList: ( state, action: PayloadAction<WorkTaskGroupItem[]> ) => {
            workTaskGroupAdapter.setAll(state, action.payload)
        }
    },
    extraReducers: (builder) => builder 
    //Получение списка групп услуг
        .addCase(fetchWorkTaskGroupList.pending, (state, action)=>{
            state.error = undefined
            state.isLoading = true
        })
        .addCase(fetchWorkTaskGroupList.fulfilled, (state, action: PayloadAction<WorkTaskGroupItem[]>)=>{
            state.isLoading = false
            workTaskGroupAdapter.setAll(state, action.payload)

        })
        .addCase(fetchWorkTaskGroupList.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
    
    //Удаление группы услуг
        .addCase(deleteWorkTaskGroup.pending, (state)=>{
            state.error = undefined
            state.isLoading = true
        })
        .addCase(deleteWorkTaskGroup.fulfilled, (state)=>{
            state.isLoading = false

        })
        .addCase(deleteWorkTaskGroup.rejected, (state, action)=>{
            state.isLoading = false
            state.error = action.payload
        })
})
>>>>>>> main

export const { actions: workTaskGroupActions } = workTaskGroupSlice;
export const { reducer: workTaskGroupReducer } = workTaskGroupSlice;
