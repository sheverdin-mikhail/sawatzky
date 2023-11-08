import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { WorkMaterial } from 'entities/WorkMaterial';
import { StateSchema } from 'app/providers';
import { WorkMaterialGroupItem } from 'entities/WorkMaterialGroup';
import { DirectoryWorkMaterialGroupDetailSchema } from '../type/directoryWorkMaterialGroupDetail';
import { fetchWorkMaterialListByGroupId } from '../services/fetchWorkMaterialListByGroupId';

const directoryWorkMaterialGroupDetailAdapter = createEntityAdapter<WorkMaterial>({
  selectId: (WorkMaterial) => WorkMaterial.id,
});

export const getDirectoryWorkMaterialGroupDetail = directoryWorkMaterialGroupDetailAdapter.getSelectors<StateSchema>(
  (state) => state.directoryWorkMaterialGroupDetail || directoryWorkMaterialGroupDetailAdapter.getInitialState(),
);

export const directoryWorkMaterialGroupDetailSlice = createSlice({
  name: 'directoryWorkMaterialGroupDetail',
  initialState: directoryWorkMaterialGroupDetailAdapter.getInitialState<DirectoryWorkMaterialGroupDetailSchema>({
    ids: [],
    entities: {},
    error: undefined,
    isLoading: false,
  }),
  reducers: {},
  extraReducers: (builder) => builder
    // Аунтификация пользователя
    .addCase(fetchWorkMaterialListByGroupId.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(fetchWorkMaterialListByGroupId.fulfilled, (state, action: PayloadAction<WorkMaterialGroupItem>) => {
      state.isLoading = false;
      if (action.payload.materials) {
        directoryWorkMaterialGroupDetailAdapter.setAll(state, action.payload.materials);
      }
      state.groupName = action.payload.name;
    })
    .addCase(fetchWorkMaterialListByGroupId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),

});

export const { actions: directoryWorkMaterialGroupDetailActions } = directoryWorkMaterialGroupDetailSlice;
export const { reducer: directoryWorkMaterialGroupDetailReducer } = directoryWorkMaterialGroupDetailSlice;
