import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { WorkObjectGroup, WorkObjectGroupSchema } from '../types/workObjectGroup';
import { fetchWorkObjectGroupList } from '../services/fetchWorkObjectGroupList';

export const workObjectGroupAdapter = createEntityAdapter<WorkObjectGroup>({
  selectId: (workObjectGroup) => workObjectGroup.id,
});

export const getWorkObjectGroup = workObjectGroupAdapter.getSelectors<StateSchema>(
  (state) => state.workObjectGroup || workObjectGroupAdapter.getInitialState(),
);

export const workObjectGroupSlice = createSlice({
  name: 'workObjectGroup',
  initialState: workObjectGroupAdapter.getInitialState<WorkObjectGroupSchema>({
    ids: [],
    entities: {},
    isLoading: false,
  }),
  reducers: {
  },

  extraReducers: (builder) => builder
    .addCase(fetchWorkObjectGroupList.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchWorkObjectGroupList.fulfilled, (state, action) => {
      state.isLoading = false;
      workObjectGroupAdapter.setAll(state, action.payload);
    })
    .addCase(fetchWorkObjectGroupList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: workObjectGroupActions } = workObjectGroupSlice;
export const { reducer: workObjectGroupReducer } = workObjectGroupSlice;
