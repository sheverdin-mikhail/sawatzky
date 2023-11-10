import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { LegalEntity, LegalEntitySchema } from '../type/legalEntity';

export const legalEntityAdapter = createEntityAdapter<LegalEntity>({
  selectId: (legalEntity) => legalEntity.id,
});

export const getLegalEntity = legalEntityAdapter.getSelectors<StateSchema>(
  (state) => state.legalEntity || legalEntityAdapter.getInitialState(),
);

export const legalEntitySlice = createSlice({
  name: 'legalEntity',
  initialState: legalEntityAdapter.getInitialState<LegalEntitySchema>({
    ids: [],
    entities: {},
    isLoading: false,
  }),
  reducers: {
  },

});

export const { actions: legalEntityActions } = legalEntitySlice;
export const { reducer: legalEntityReducer } = legalEntitySlice;
