import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { WorkMaterialGroupItem, WorkMaterialGroupSchema } from '../type/workMaterialGroup';
import { fetchWorkMaterialGroupList } from '../services/fetchWorkMaterialGroupList';
import { deleteWorkMaterialGroup } from '../services/deleteWorkMaterialGroup';

export const workMaterialGroupAdapter = createEntityAdapter<WorkMaterialGroupItem>({
  selectId: (application) => application.id,
});

export const getWorkMaterialGroup = workMaterialGroupAdapter.getSelectors<StateSchema>(
  (state) => state.workMaterialGroup || workMaterialGroupAdapter.getInitialState(),
);

export const workMaterialGroupSlice = createSlice({
  name: 'workMaterialGroup',
  initialState: workMaterialGroupAdapter.getInitialState<WorkMaterialGroupSchema>({
    ids: [],
    entities: {},
    isLoading: false,
    error: undefined,
  }),
  reducers: {
    setWorkMaterialGroupList: (state, action: PayloadAction<WorkMaterialGroupItem[]>) => {
      workMaterialGroupAdapter.setAll(state, action.payload);
    },
  },
  extraReducers: (builder) => builder
    // Получение списка групп материалов
    .addCase(fetchWorkMaterialGroupList.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(fetchWorkMaterialGroupList.fulfilled, (state, action: PayloadAction<WorkMaterialGroupItem[]>) => {
      state.isLoading = false;
      workMaterialGroupAdapter.setAll(state, action.payload);
    })
    .addCase(fetchWorkMaterialGroupList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Удаление группы материалов
    .addCase(deleteWorkMaterialGroup.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(deleteWorkMaterialGroup.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteWorkMaterialGroup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: workMaterialGroupActions } = workMaterialGroupSlice;
export const { reducer: workMaterialGroupReducer } = workMaterialGroupSlice;
