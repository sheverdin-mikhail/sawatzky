import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { WorkObject, WorkObjectSchema } from '../types/workObject';
import { fetchWorkObjectList } from '../services/fetchWorkObjectList';

export const workObjectAdapter = createEntityAdapter<WorkObject>({
  selectId: (workObject) => workObject.id,
});

export const getWorkObject = workObjectAdapter.getSelectors<StateSchema>(
  (state) => state.workObject || workObjectAdapter.getInitialState(),
);

export const workObjectSlice = createSlice({
  name: 'workObject',
  initialState: workObjectAdapter.getInitialState<WorkObjectSchema>({
    ids: [],
    entities: {},
    isLoading: false,
  }),
  reducers: {
  },

  extraReducers: (builder) => builder
    .addCase(fetchWorkObjectList.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchWorkObjectList.fulfilled, (state, action) => {
      state.isLoading = false;
      workObjectAdapter.setAll(state, action.payload);
    })
    .addCase(fetchWorkObjectList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: workObjectActions } = workObjectSlice;
export const { reducer: workObjectReducer } = workObjectSlice;
