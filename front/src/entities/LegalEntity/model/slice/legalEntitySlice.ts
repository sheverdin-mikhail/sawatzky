import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { LegalEntity, LegalEntitySchema } from '../type/legalEntity';
import { fetchLegalEntityList } from '../services/fetchLegalEntityList';

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
    // Получение списка групп материалов
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
    }),
});

export const { actions: legalEntityActions } = legalEntitySlice;
export const { reducer: legalEntityReducer } = legalEntitySlice;
