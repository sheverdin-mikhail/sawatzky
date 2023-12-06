import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers';
import { fetchEmployeeList } from '../services/fetchEmployeeList';
import { Employee, EmployeeSchema } from '../type/employee';

export const EmployeeAdapter = createEntityAdapter<Employee>({
  selectId: (employee) => employee.id,
});

export const getEmployee = EmployeeAdapter.getSelectors<StateSchema>(
  (state) => state.employee || EmployeeAdapter.getInitialState(),
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: EmployeeAdapter.getInitialState<EmployeeSchema>({
    ids: [],
    entities: {},
    isLoading: false,
  }),
  reducers: {
  },

  extraReducers: (builder) => builder
    .addCase(fetchEmployeeList.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchEmployeeList.fulfilled, (state, action) => {
      state.isLoading = false;
      EmployeeAdapter.setAll(state, action.payload);
    })
    .addCase(fetchEmployeeList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});

export const { actions: employeeActions } = employeeSlice;
export const { reducer: employeeReducer } = employeeSlice;
