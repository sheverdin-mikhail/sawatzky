import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { fetchPerformersList } from '../services/fetchPerformersList';
import { Performer, PerformerSchema } from '../types/performer';

export const PerformerAdapter = createEntityAdapter<Performer>({
  selectId: (performer) => performer.id,
});

export const getPerformer = PerformerAdapter.getSelectors<StateSchema>(
  (state) => state.performer || PerformerAdapter.getInitialState(),
);

export const performerSlice = createSlice({
  name: 'performer',
  initialState: PerformerAdapter.getInitialState<PerformerSchema>({
    ids: [],
    entities: {},
    isLoading: false,
  }),
  reducers: {
  },

  extraReducers: (builder) => builder
    .addCase(fetchPerformersList.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchPerformersList.fulfilled, (state, action) => {
      state.isLoading = false;
      PerformerAdapter.setAll(state, action.payload);
    })
    .addCase(fetchPerformersList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: performerActions } = performerSlice;
export const { reducer: performerReducer } = performerSlice;
