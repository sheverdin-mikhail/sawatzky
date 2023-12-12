import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { LegalEntity, LegalEntitySchema } from '../type/legalEntity';
import { fetchLegalEntityList } from '../services/fetchLegalEntityList';
import { deleteLegalEntity } from '../services/deleteLegalEntity';
import { deleteLegalEntitySawatzky } from '../services/deleteLegalEntitySawatzky';
import { deleteLegalEntityCounter } from '../services/deleteLegalEntityCounter';

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
  extraReducers: (builder) => builder
    // Получение списка юр лиц
    .addCase(fetchLegalEntityList.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(fetchLegalEntityList.fulfilled, (state, action: PayloadAction<LegalEntity[]>) => {
      state.isLoading = false;
      legalEntityAdapter.setAll(state, action.payload);
    })
    .addCase(fetchLegalEntityList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Удаление юр лица
    .addCase(deleteLegalEntity.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(deleteLegalEntity.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteLegalEntity.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Удаление юр лица Sawatzky
    .addCase(deleteLegalEntitySawatzky.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(deleteLegalEntitySawatzky.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteLegalEntitySawatzky.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Удаление юр лица контрагента
    .addCase(deleteLegalEntityCounter.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(deleteLegalEntityCounter.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteLegalEntityCounter.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: legalEntityActions } = legalEntitySlice;
export const { reducer: legalEntityReducer } = legalEntitySlice;
