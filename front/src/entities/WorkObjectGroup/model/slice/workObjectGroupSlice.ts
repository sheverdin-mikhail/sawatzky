import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { WorkObjectGroup, WorkObjectGroupSchema } from '../types/workObjectGroup';
import { fetchWorObjectGroupList } from '../services/fetchWorkObjectGroupList';

export const workObjectGroupAdapter = createEntityAdapter<WorkObjectGroup>({
  selectId: (workObjectGroup) => workObjectGroup.id,
});

export const getworkObjectGroup = workObjectGroupAdapter.getSelectors<StateSchema>(
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
    .addCase(fetchWorObjectGroupList.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchWorObjectGroupList.fulfilled, (state, action) => {
      state.isLoading = false;
      workObjectGroupAdapter.setAll(state, action.payload);
    })
    .addCase(fetchWorObjectGroupList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: workObjectGroupActions } = workObjectGroupSlice;
export const { reducer: workObjectGroupReducer } = workObjectGroupSlice;
