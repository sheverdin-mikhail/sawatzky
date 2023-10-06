import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';
import { createReducerManager } from './ReducerManager';
import { appointmentReducer } from 'entities/Appointment/models/slice/appointmentSlice';
import { $api } from 'shared/api/api';
import { useNavigate } from 'react-router-dom';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        appointment: appointmentReducer
    };

    const reducerManager = createReducerManager(rootReducers);
    // const navigate = useNavigate()

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>> ,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    api: $api
                }
            }
        })
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
