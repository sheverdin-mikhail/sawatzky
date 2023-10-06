import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { userReducer } from 'entities/User';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './ReducerManager';
import { appointmentReducer } from 'entities/Appointment/models/slice/appointmentSlice';
import { $api } from 'shared/api/api';
import { NavigateOptions, To } from 'react-router-dom';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        user: userReducer,
        appointment: appointmentReducer
    };

    const reducerManager = createReducerManager(rootReducers);
    // const navigate = useNavigate()

<<<<<<< HEAD
    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate
    }

=======
>>>>>>> 61f6277 (started editing of think api)
    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>> ,
        preloadedState: initialState,
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            thunk: {
<<<<<<< HEAD
                extraArgument: extraArg
=======
                extraArgument: {
                    api: $api
                }
>>>>>>> 61f6277 (started editing of think api)
            }
        })
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
