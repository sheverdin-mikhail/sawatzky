import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { fetchSawatzkyEmployeeList } from '../services/fetchSawatzkyEmployeeList';
import { SawatzkyEmployee, SawatzkyEmployeeSchema } from '../type/sawatzkyEmployee';
import { deleteSawatzkyEmployee } from '../services/deleteSawatzkyEmployee';

export const sawatzkyEmployeeAdapter = createEntityAdapter<SawatzkyEmployee>({
  selectId: (sawatzkyEmployee) => sawatzkyEmployee.id,
});

export const getSawatzkyEmployee = sawatzkyEmployeeAdapter.getSelectors<StateSchema>(
  (state) => state.sawatzkyEmployee || sawatzkyEmployeeAdapter.getInitialState(),
);

export const sawatzkyEmployeeSlice = createSlice({
  name: 'sawatzkyEmployee',
  initialState: sawatzkyEmployeeAdapter.getInitialState<SawatzkyEmployeeSchema>({
    ids: [],
    entities: {},
    isLoading: false,
  }),
  reducers: {
  },

  extraReducers: (builder) => builder
    .addCase(fetchSawatzkyEmployeeList.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchSawatzkyEmployeeList.fulfilled, (state, action) => {
      state.isLoading = false;
      sawatzkyEmployeeAdapter.setAll(state, action.payload);
    })
    .addCase(fetchSawatzkyEmployeeList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Удаление сотрудника Sawatzky
    .addCase(deleteSawatzkyEmployee.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(deleteSawatzkyEmployee.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(deleteSawatzkyEmployee.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: sawatzkyEmployeeActions } = sawatzkyEmployeeSlice;
export const { reducer: sawatzkyEmployeeReducer } = sawatzkyEmployeeSlice;
